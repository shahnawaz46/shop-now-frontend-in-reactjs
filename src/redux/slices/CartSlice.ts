import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/AxiosInstance";
import { RequestStatus } from "../../types/enums/RequestStatus";
import {
  ICartItem,
  IProductSizes,
  IUpdateCartItem,
} from "../../types/interfaces/product.interface";

interface CartState {
  status: RequestStatus;
  cartItems: ICartItem[];
  error: string | undefined | null;
}

const initialState: CartState = {
  status: RequestStatus.Idle,
  cartItems: [],
  error: null,
};

export const getCartItem = createAsyncThunk("cart/getCartItem", async () => {
  const _userId: string | null = localStorage.getItem("__f_id");

  // if user is logged in then call the api and get cartItem from db
  // otherwise get cartItem from LocalStorage
  if (_userId) {
    const res = await axiosInstance.get("/cart");
    return res.data.allCartItem as ICartItem[];
  } else {
    const isCartItemPresent: string | null =
      localStorage.getItem("__f_cartItem");
    return (
      isCartItemPresent ? JSON.parse(isCartItemPresent) : []
    ) as ICartItem[];
  }
});

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (product: { _id: string; size: keyof IProductSizes }) => {
    const _userId: string | null = localStorage.getItem("__f_id");

    // if user is logged in then call the api and remove cartItem from db
    // otherwise remove cartItem from LocalStorage
    if (_userId) {
      await axiosInstance.delete("/cart", { data: { product } });
      return product;
    }

    const cartItems: string | null = localStorage.getItem("__f_cartItem");
    if (!cartItems) {
      throw new Error("No items in the cart to remove");
    }

    const parseCartItem: ICartItem[] = JSON.parse(cartItems);
    const removedProductIndex: number = parseCartItem.findIndex(
      (item) => item._id === product._id && item.size === product.size
    );

    if (removedProductIndex === -1) {
      throw new Error("Item not found in the cart.");
    }

    parseCartItem.splice(removedProductIndex, 1);
    localStorage.setItem("__f_cartItem", JSON.stringify(parseCartItem));
    // console.log(parseCartItem, removedProductIndex)

    return product;
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (product: ICartItem) => {
    const _userId: string | null = localStorage.getItem("__f_id");

    // if user is logged in then call the api and store cartItem into db
    // otherwise store the cartItem into LocalStorage
    if (_userId) {
      const { _id, size, qty } = product;
      await axiosInstance.post("/cart", {
        productId: _id,
        size,
        qty,
      });

      return product;
    }

    // if user is not logged in
    const isCartItemPresent: string | null =
      localStorage.getItem("__f_cartItem");
    if (!isCartItemPresent) {
      localStorage.setItem("__f_cartItem", JSON.stringify([product]));
      return product;
    }

    const parseCartItem: ICartItem[] = JSON.parse(isCartItemPresent);
    parseCartItem.push(product);
    localStorage.setItem("__f_cartItem", JSON.stringify(parseCartItem));

    return product;
  }
);

const updateCartItem = (actionType: "increment" | "decrement") =>
  createAsyncThunk(`cart/${actionType}`, async (product: IUpdateCartItem) => {
    const _userId: string | null = localStorage.getItem("__f_id");

    // if user is logged in then call the api and store cartItem into db
    // otherwise store the cartItem into LocalStorage
    if (_userId) {
      const { _id, size, qty } = product;
      await axiosInstance.post("/cart", {
        productId: _id,
        size,
        qty,
      });

      return product;
    }

    // if user is not logged in
    const isCartItemPresent: string = localStorage.getItem("__f_cartItem")!;
    const parseCartItem: ICartItem[] = JSON.parse(isCartItemPresent);

    const index = parseCartItem.findIndex(
      (item) => item._id === product._id && item.size === product.size
    );

    parseCartItem[index].qty += product.qty;
    localStorage.setItem("__f_cartItem", JSON.stringify(parseCartItem));

    return product;
  });

export const incrementCartItem = updateCartItem("increment");
export const decrementCartItem = updateCartItem("decrement");

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    emptyCart: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItem.pending, (state) => {
        state.status = RequestStatus.Pending;
      })
      .addCase(getCartItem.fulfilled, (state, action) => {
        state.cartItems = action.payload;
        state.status = RequestStatus.Succeeded;
      })
      .addCase(getCartItem.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
        state.error = action.error.message;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cartItems.push(action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(incrementCartItem.fulfilled, (state, action) => {
        // increment product quantity in cart
        const index: number = state.cartItems.findIndex(
          (item) =>
            item._id === action.payload._id && item.size === action.payload.size
        );

        if (index >= 0) {
          state.cartItems[index].qty += action.payload.qty;
        }
      })
      .addCase(incrementCartItem.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(decrementCartItem.fulfilled, (state, action) => {
        // decrement product quantity in cart
        const index: number = state.cartItems.findIndex(
          (item) =>
            item._id === action.payload._id && item.size === action.payload.size
        );

        if (index >= 0) {
          state.cartItems[index].qty += action.payload.qty;
        }
      })
      .addCase(decrementCartItem.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        // const filteredCartItems = state.cartItems.filter((item)=> item.productId !== action.payload._id && item.size !== action.payload.size)
        const removedProductIndex: number = state.cartItems.findIndex(
          (item) =>
            item._id === action.payload._id && item.size === action.payload.size
        );
        state.cartItems.splice(removedProductIndex, 1);
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { emptyCart } = cartSlice.actions;

export default cartSlice.reducer;
