import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./slices/CartSlice";
import AuthReducer from "./slices/AuthSlice";
import UserAddress from "./slices/AddressSlice";

const store = configureStore({
  reducer: {
    cart: CartReducer,
    auth: AuthReducer,
    address: UserAddress,
  },
});

export default store;

// create two type 1st for useDispatch and 2nd for useSelector
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
