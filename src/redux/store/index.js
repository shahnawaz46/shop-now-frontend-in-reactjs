import {configureStore } from '@reduxjs/toolkit'
import ProductReducer from '../slices/ProductSlice'

const store = configureStore({
    reducer:{
        allProducts: ProductReducer
    }
})

export default store