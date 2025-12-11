import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RequestStatus } from "../../types/enums/RequestStatus";
import { IAddressDetails } from "../../types/interfaces/user.interface";
import axiosInstance from "../../axios/AxiosInstance";

interface AddressState {
  status: RequestStatus;
  error: string | null | undefined;
  addressDetails: IAddressDetails[];
}

const initialState: AddressState = {
  status: RequestStatus.Idle,
  error: null,
  addressDetails: [],
};

export const fetchAddressDetails = createAsyncThunk(
  "addressDetails/fetch",
  async () => {
    const res = await axiosInstance.get("/address");
    return res.data.userAddress as IAddressDetails[];
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
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
      .addCase(fetchAddressDetails.pending, (state) => {
        state.status = RequestStatus.Pending;
      })
      .addCase(fetchAddressDetails.fulfilled, (state, action) => {
        state.status = RequestStatus.Succeeded;
        state.addressDetails = action.payload;
      })
      .addCase(fetchAddressDetails.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
        state.error = action.error.message;
      });
  },
});

export const { addAddress, updateAddress, deleteAddress, logout } =
  addressSlice.actions;

export default addressSlice.reducer;
