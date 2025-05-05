import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../axios/AxiosInstance';
import { RequestStatus } from '../../types/enums/RequestStatus';
import {
  IAddressDetails,
  IPersonalDetail,
} from '../../types/interfaces/user.interface';

interface UserState {
  status: RequestStatus;
  error: string | null | undefined;
  personalDetails: IPersonalDetail | null;
  addressDetails: IAddressDetails[];
}

const initialState: UserState = {
  status: RequestStatus.Idle,
  error: null,
  personalDetails: null,
  addressDetails: [],
};

interface ResponseType {
  userDetail: IPersonalDetail;
  address: IAddressDetails[];
}

export const fetchPersonalDetails = createAsyncThunk(
  'personalDetail/fetch',
  async () => {
    const res = await axiosInstance.get('/profile');
    return res.data as ResponseType;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updatePersonDetail: (state, action: PayloadAction<IPersonalDetail>) => {
      state.personalDetails = action.payload;
    },

    addAddress: (state, action: PayloadAction<IAddressDetails>) => {
      state.addressDetails.push(action.payload);
    },

    updateAddress: (state, action: PayloadAction<IAddressDetails>) => {
      const index: number = state.addressDetails.findIndex(
        (item) => item._id === action.payload._id
      );
      state.addressDetails.splice(index, 1, action.payload);
    },

    deleteAddress: (state, action: PayloadAction<string>) => {
      const updatedAddress = state.addressDetails.filter(
        (item) => item._id !== action.payload
      );
      state.addressDetails = updatedAddress;
    },

    logout: () => {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPersonalDetails.pending, (state) => {
        state.status = RequestStatus.Pending;
      })
      .addCase(fetchPersonalDetails.fulfilled, (state, action) => {
        state.status = RequestStatus.Succeeded;
        state.personalDetails = action.payload.userDetail;
        state.addressDetails = action.payload.address;
      })
      .addCase(fetchPersonalDetails.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
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
