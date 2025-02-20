import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../axios/AxiosInstance';

const initialState = {
  status: 'idle',
  error: null,
  personalDetails: {},
  addressDetails: [],
};

export const fetchPersonalDetails = createAsyncThunk(
  'personalDetail/fetch',
  async () => {
    const res = await axiosInstance.get('/profile');
    return res.data;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updatePersonDetail: (state, action) => {
      state.personalDetails = action.payload;
    },
    addAddress: (state, action) => {
      state.addressDetails.push(action.payload);
    },
    updateAddress: (state, action) => {
      const index = state.addressDetails.findIndex(
        (item) => item._id === action.payload._id
      );
      state.addressDetails.splice(index, 1, action.payload);
    },
    deleteAddress: (state, action) => {
      const updatedAddress = state.addressDetails.filter(
        (item) => item._id !== action.payload
      );
      state.addressDetails = updatedAddress;
    },

    logout: (state) => {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPersonalDetails.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(fetchPersonalDetails.fulfilled, (state, action) => {
        state.status = 'success';
        state.personalDetails = action.payload.userDetail;
        state.addressDetails = action.payload.address;
      })
      .addCase(fetchPersonalDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {
  updatePersonDetail,
  addAddress,
  updateAddress,
  deleteAddress,
  logout,
} = userSlice.actions;

export default userSlice.reducer;
