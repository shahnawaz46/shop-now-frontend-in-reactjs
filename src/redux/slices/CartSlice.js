import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../axios/AxiosInstance';

const initialState = {
  cartItems: [],
  error: null,
};

export const addToCart = createAsyncThunk('cart/addToCart', async (product) => {
  // console.log(product)
  const _userId = localStorage.getItem('__f_id');

  // if user is logged in then call the api and store cartItem into db
  // otherwise store the cartItem into LocalStorage
  if (_userId) {
    const { _id, size, qty } = product;
    await axiosInstance.post('/user/cartItem/add', {
      productId: _id,
      size,
      qty,
    });
  } else {
    const isCartItemPresent = localStorage.getItem('__f_cartItem');
    if (!isCartItemPresent) {
      localStorage.setItem('__f_cartItem', JSON.stringify([product]));
    } else {
      const parseCartItem = JSON.parse(isCartItemPresent);
      const index = parseCartItem.findIndex(
        (item) => item._id === product._id && item.size === product.size
      );
      if (index >= 0) {
        parseCartItem[index].qty += product.qty;
        localStorage.setItem('__f_cartItem', JSON.stringify(parseCartItem));
      } else {
        parseCartItem.push(product);
        localStorage.setItem('__f_cartItem', JSON.stringify(parseCartItem));
      }
    }
  }

  return product;
});

export const getCartItem = createAsyncThunk('cart/getCartItem', async () => {
  const _userId = localStorage.getItem('__f_id');

  // if user is logged in then call the api and get cartItem from db
  // otherwise get cartItem from LocalStorage
  if (_userId) {
    const res = await axiosInstance.get('/user/cartItem/get');
    return res.data.allCartItem;
  } else {
    const isCartItemPresent = localStorage.getItem('__f_cartItem');
    return isCartItemPresent ? JSON.parse(isCartItemPresent) : [];
  }
});

export const removeCartItem = createAsyncThunk(
  'cart/removeCartItem',
  async (product) => {
    const _userId = localStorage.getItem('__f_id');

    // if user is logged in then call the api and remove cartItem from db
    // otherwise remove cartItem from LocalStorage
    if (_userId) {
      await axiosInstance.delete('/user/cartItem/remove', {
        data: { product },
      });
    } else {
      const parseCartItem = JSON.parse(localStorage.getItem('__f_cartItem'));
      const removedProductIndex = parseCartItem.findIndex(
        (item) => item._id === product._id && item.size === product.size
      );
      parseCartItem.splice(removedProductIndex, 1);
      localStorage.setItem('__f_cartItem', JSON.stringify(parseCartItem));
      // console.log(parseCartItem, removedProductIndex)
    }
    return product;
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.fulfilled, (state, action) => {
        // iterating the array and checking wheather item is already present or not
        // if item is already present in the Cart then increment the quantity
        // else push the item into Cart
        const index = state.cartItems.findIndex(
          (item) =>
            item._id === action.payload._id && item.size === action.payload.size
        );
        index >= 0
          ? (state.cartItems[index].qty += action.payload.qty)
          : state.cartItems.push(action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getCartItem.fulfilled, (state, action) => {
        state.cartItems.push(...action.payload);
      })
      .addCase(getCartItem.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        // const filteredCartItems = state.cartItems.filter((item)=> item.productId !== action.payload._id && item.size !== action.payload.size)
        const removedProductIndex = state.cartItems.findIndex(
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

// export const {addToCart} = cartSlice.actions

export default cartSlice.reducer;
