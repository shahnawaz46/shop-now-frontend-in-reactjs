import { configureStore } from '@reduxjs/toolkit';
import CartReducer from './slices/CartSlice';
import UserReducer from './slices/UserSlice';

const store = configureStore({
  reducer: {
    cart: CartReducer,
    user: UserReducer,
  },
});

export default store;

// create two type 1st for useDispatch and 2nd for useSelector
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
