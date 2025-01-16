import { configureStore } from '@reduxjs/toolkit';
import CartReducer from '../slices/CartSlice';
import UserReducer from '../slices/UserSlice';

const store = configureStore({
  reducer: {
    cart: CartReducer,
    user: UserReducer,
  },
});

export default store;
