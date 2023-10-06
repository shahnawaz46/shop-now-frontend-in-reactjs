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
    products: [],
    subCategory: [],
    status: 'idle',
    error: null,
  },
  womenProducts: {
    products: [],
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
    const res = await axiosInstance.get("/product/all/Men's-Wardrobe");
    return res.data;
  }
);

export const fetchWomenProducts = createAsyncThunk(
  'womenProduct/fetch',
  async () => {
    const res = await axiosInstance.get("/product/all/Women's-Wardrobe");
    return res.data;
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
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
        state.menProducts.products.push(...action.payload.products);
        state.menProducts.subCategory.push(...action.payload.subCategory);
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
        state.womenProducts.products.push(...action.payload.products);
        state.womenProducts.subCategory.push(...action.payload.subCategory);
      })
      .addCase(fetchWomenProducts.rejected, (state, action) => {
        state.womenProducts.status = 'failed';
        state.womenProducts.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
