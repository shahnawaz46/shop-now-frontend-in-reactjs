import {configureStore } from '@reduxjs/toolkit'
import ProductReducer from '../slices/ProductSlice'
import CartReducer from '../slices/CartSlice'
import UserReducer from '../slices/UserSlice'
import AddressReducer from '../slices/AddressSlice'

const store = configureStore({
    reducer:{
        allProducts: ProductReducer,
        cart: CartReducer,
        user: UserReducer,
        address: AddressReducer,
    }
})

export default store