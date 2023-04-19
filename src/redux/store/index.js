import {configureStore } from '@reduxjs/toolkit'
import ProductReducer from '../slices/ProductSlice'
import CartReducer from '../slices/CartSlice'

const store = configureStore({
    reducer:{
        allProducts: ProductReducer,
        cart: CartReducer
    }
})

export default store