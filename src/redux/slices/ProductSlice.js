import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axios/AxiosInstance';

const initialState = {
  homePageProducts: {
    status: 'idle',
    topRatingProducts: [],
    topTrendingProducs: [],
    error: null,
  },
  menProducts: {
    products: { next: null, data: [] },
    subCategory: [],
    status: 'idle',
    error: null,
  },
  womenProducts: {
    products: { next: null, data: [] },
    subCategory: [],
    status: 'idle',
    error: null,
  },
};

export const fetchHomePageProducts = createAsyncThunk(
  'homePageProducts/fetch',
  async () => {
    const [topTrendingProductRes, topRatingProductRes] = await Promise.all([
      axiosInstance.get('/product/top-trending'),
      axiosInstance.get('/product/top-rated'),
    ]);

    return {
      topTrendingProductRes: topTrendingProductRes.data.products,
      topRatingProductRes: topRatingProductRes.data.products,
    };
  }
);

export const fetchMenProducts = createAsyncThunk(
  'menProduct/fetch',
  async () => {
    const [categoriesRes, productRes] = await Promise.all([
      axiosInstance.get("/category/Men's-Wardrobe"),
      axiosInstance.get('/product/all/Men'),
    ]);

    return {
      categories: categoriesRes.data.categories,
      product: productRes.data,
    };
  }
);

export const fetchWomenProducts = createAsyncThunk(
  'womenProduct/fetch',
  async () => {
    const [categoriesRes, productRes] = await Promise.all([
      axiosInstance.get("/category/Women's-Wardrobe"),
      axiosInstance.get('/product/all/Women'),
    ]);

    return {
      categories: categoriesRes.data.categories,
      product: productRes.data,
    };
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    updateProducts: (state, action) => {
      const { stateName, data } = action.payload;
      state[stateName].products.next = data.next;
      state[stateName].products.data.push(...data.data);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomePageProducts.fulfilled, (state, action) => {
        state.homePageProducts.status = 'success';
        state.homePageProducts.topTrendingProducs =
          action.payload.topTrendingProductRes;
        state.homePageProducts.topRatingProducts =
          action.payload.topRatingProductRes;
      })
      .addCase(fetchHomePageProducts.rejected, (state, action) => {
        state.homePageProducts.status = 'failed';
        state.homePageProducts.error = action.error.message;
      })
      .addCase(fetchMenProducts.pending, (state, action) => {
        state.menProducts.status = 'pending';
      })
      .addCase(fetchMenProducts.fulfilled, (state, action) => {
        state.menProducts.status = 'success';
        state.menProducts.products = action.payload.product;
        state.menProducts.subCategory = action.payload.categories;
      })
      .addCase(fetchMenProducts.rejected, (state, action) => {
        state.womenProducts.status = 'failed';
        state.womenProducts.error = action.error.message;
      })
      .addCase(fetchWomenProducts.pending, (state, action) => {
        state.womenProducts.status = 'pending';
      })
      .addCase(fetchWomenProducts.fulfilled, (state, action) => {
        state.womenProducts.status = 'success';
        state.womenProducts.products = action.payload.product;
        state.womenProducts.subCategory = action.payload.categories;
      })
      .addCase(fetchWomenProducts.rejected, (state, action) => {
        state.womenProducts.status = 'failed';
        state.womenProducts.error = action.error.message;
      });
  },
});

export const { updateProducts } = productSlice.actions;

export default productSlice.reducer;
