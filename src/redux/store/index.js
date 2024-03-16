import { configureStore } from '@reduxjs/toolkit';
import ProductReducer from '../slices/ProductSlice';
import CartReducer from '../slices/CartSlice';
import UserReducer from '../slices/UserSlice';
import AnotherProductReducer from '../slices/AnotherProductSlice';

const store = configureStore({
  reducer: {
    allProducts: ProductReducer,
    cart: CartReducer,
    user: UserReducer,
    anotherProduct: AnotherProductReducer,
  },
});

export default store;
