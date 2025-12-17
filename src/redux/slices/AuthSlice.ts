import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/AxiosInstance";
import { ERequestStatus } from "../../types/enums";
import { IPersonalDetail } from "../../types/interfaces/user.interface";
import { logout } from "../actions";
import { IDeviceInfo, ILoginState } from "../../types/interfaces/auth";
import { setToken } from "../../services/tokenService";

interface IUserState {
  status: ERequestStatus;
  error: string | null | undefined;
  user: IPersonalDetail | null;
  isAuthenticated: boolean | null;
}

type LoginPayload = ILoginState & IDeviceInfo;

const initialState: IUserState = {
  status: ERequestStatus.Idle,
  error: null,
  user: null,
  isAuthenticated: null,
};

export const fetchAuthDetails = createAsyncThunk("auth/fetch", async () => {
  const res = await axiosInstance.get("/profile");
  return res.data.userDetail as IPersonalDetail;
});

export const loginUser = createAsyncThunk(
  "auth/login",
  async (payload: LoginPayload) => {
    const res = await axiosInstance.post("/signin", payload);
    setToken(res.data._a_t);
    return res.data;
  }
);

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updatePersonDetail: (state, action: PayloadAction<IPersonalDetail>) => {
      state.user = action.payload;
    },
    addUser: (state, action: PayloadAction<IPersonalDetail>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.status = ERequestStatus.Succeeded;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = ERequestStatus.Pending;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = ERequestStatus.Succeeded;
        state.user = action.payload.userDetail;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = ERequestStatus.Failed;
        state.error = action.error.message;
        state.isAuthenticated = false;
      })
      .addCase(fetchAuthDetails.pending, (state) => {
        state.status = ERequestStatus.Pending;
      })
      .addCase(fetchAuthDetails.fulfilled, (state, action) => {
        state.status = ERequestStatus.Succeeded;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchAuthDetails.rejected, (state, action) => {
        state.status = ERequestStatus.Failed;
        state.error = action.error.message;
        state.isAuthenticated = false;
      })
      .addCase(logout, () => {
        return { ...initialState, isAuthenticated: false };
      });
  },
});

export const { updatePersonDetail, addUser } = AuthSlice.actions;

export default AuthSlice.reducer;
