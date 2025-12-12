import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ERequestStatus } from "../../types/enums";
import { IAddressDetails } from "../../types/interfaces/user.interface";
import axiosInstance from "../../axios/AxiosInstance";
import { logout } from "../actions";
// import { logout } from "../store";

interface AddressState {
  status: ERequestStatus;
  error: string | null | undefined;
  addressDetails: IAddressDetails[];
}

const initialState: AddressState = {
  status: ERequestStatus.Idle,
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
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAddressDetails.pending, (state) => {
        state.status = ERequestStatus.Pending;
      })
      .addCase(fetchAddressDetails.fulfilled, (state, action) => {
        state.status = ERequestStatus.Succeeded;
        state.addressDetails = action.payload;
      })
      .addCase(fetchAddressDetails.rejected, (state, action) => {
        state.status = ERequestStatus.Failed;
        state.error = action.error.message;
      })
      .addCase(logout, () => {
        return initialState;
      });
  },
});

export const { addAddress, updateAddress, deleteAddress } =
  addressSlice.actions;

export default addressSlice.reducer;
