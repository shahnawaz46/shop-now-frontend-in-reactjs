import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/AxiosInstance";
import { ERequestStatus } from "../../types/enums";
import { IPersonalDetail } from "../../types/interfaces/user.interface";
import { logout } from "../actions";

interface IUserState {
  status: ERequestStatus;
  error: string | null | undefined;
  personalDetails: IPersonalDetail | null;
  isAuthenticated: boolean | null;
}

const initialState: IUserState = {
  status: ERequestStatus.Idle,
  error: null,
  personalDetails: null,
  isAuthenticated: null,
};

export const fetchPersonalDetails = createAsyncThunk(
  "personalDetail/fetch",
  async () => {
    const res = await axiosInstance.get("/profile");
    return res.data.userDetail as IPersonalDetail;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updatePersonDetail: (state, action: PayloadAction<IPersonalDetail>) => {
      state.personalDetails = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPersonalDetails.pending, (state) => {
        state.status = ERequestStatus.Pending;
      })
      .addCase(fetchPersonalDetails.fulfilled, (state, action) => {
        state.status = ERequestStatus.Succeeded;
        state.personalDetails = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchPersonalDetails.rejected, (state, action) => {
        state.status = ERequestStatus.Failed;
        state.error = action.error.message;
        state.isAuthenticated = false;
      })
      .addCase(logout, () => {
        return { ...initialState, isAuthenticated: false };
      });
  },
});

export const { updatePersonDetail } = userSlice.actions;

export default userSlice.reducer;
