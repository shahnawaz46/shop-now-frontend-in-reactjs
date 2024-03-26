import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../axios/AxiosInstance';

const initialState = {
  topSellingProducts: {
    status: 'idle',
    products: [],
    error: null,
  },
  newestProducts: {
    status: 'idle',
    products: [],
    error: null,
  },
};

export const fetchTopSellingProducts = createAsyncThunk(
  'topSellingProducts/fetch',
  async () => {
    const res = await axiosInstance.get('/product/top-selling');
    return res.data.topSellingProducts;
  }
);

export const fetchNewestProducts = createAsyncThunk(
  'newestProducts/fetch',
  async () => {
    const res = await axiosInstance.get('/product/newest');
    return res.data.newestProducts;
  }
);

export const anotherProductSlice = createSlice({
  name: 'anotherProducts',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopSellingProducts.pending, (state, action) => {
        state.topSellingProducts.status = 'pending';
      })
      .addCase(fetchTopSellingProducts.fulfilled, (state, action) => {
        state.topSellingProducts.status = 'success';
        state.topSellingProducts.products = action.payload;
      })
      .addCase(fetchTopSellingProducts.rejected, (state, action) => {
        state.topSellingProducts.status = 'failed';
        state.topSellingProducts.error = action.error.message;
      })
      .addCase(fetchNewestProducts.pending, (state, action) => {
        state.newestProducts.status = 'pending';
      })
      .addCase(fetchNewestProducts.fulfilled, (state, action) => {
        state.newestProducts.status = 'success';
        state.newestProducts.products = action.payload;
      })
      .addCase(fetchNewestProducts.rejected, (state, action) => {
        state.newestProducts.status = 'failed';
        state.newestProducts.error = action.error.message;
      });
  },
});

export default anotherProductSlice.reducer;
