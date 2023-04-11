import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axiosInstance from '../../axios/AxiosInstance'

const initialState = {
    topSellingProducts: {
        products:[],
        status:'idle',
        error: null
    },
    menProducts: {
        products:[],
        subCategory: [],
        status:'idle',
        error: null
    },
    womenProducts:{
        products:[],
        subCategory: [],
        status:'idle',
        error: null
    },
}

export const fetchTopSellingProducts = createAsyncThunk("topSellingProduct/fetch", async()=>{
    // console.log(axiosInstance)
    const res = await axiosInstance.get("/product/top/selling")
    return res.data.products
});

export const fetchMenProducts = createAsyncThunk("menProduct/fetch", async()=>{
    const res = await axiosInstance.get("/product/Men's-Wardrobe")
    return res.data
})

export const fetchWomenProducts = createAsyncThunk("womenProduct/fetch", async()=>{
    const res = await axiosInstance.get("/product/Women's-Wardrobe")
    return res.data
})

export const productSlice = createSlice({
    name:'product',
    initialState,
    extraReducers: (builder)=>{
        builder
        .addCase(fetchTopSellingProducts.fulfilled, (state,action)=>{
            state.topSellingProducts.status = "success"
            state.topSellingProducts.products.push(...action.payload)
        })
        .addCase(fetchTopSellingProducts.rejected, (state, action)=>{
            state.topSellingProducts.status = "failed"
            state.topSellingProducts.error = action.error.message
        })
        .addCase(fetchMenProducts.pending, (state, action)=>{
            state.menProducts.status = "pending"
        })
        .addCase(fetchMenProducts.fulfilled, (state, action)=>{
            state.menProducts.status = "success"
            state.menProducts.products.push(...action.payload.products)
            state.menProducts.subCategory.push(...action.payload.subCategory)
        })
        .addCase(fetchMenProducts.rejected, (state, action)=>{
            state.womenProducts.status = "failed"
            state.womenProducts.error = action.error.message
        })
        .addCase(fetchWomenProducts.pending, (state, action)=>{
            state.womenProducts.status = "pending"
        })
        .addCase(fetchWomenProducts.fulfilled, (state, action)=>{
            state.womenProducts.status = "success"
            state.womenProducts.products.push(...action.payload.products)
            state.womenProducts.subCategory.push(...action.payload.subCategory)
        })
        .addCase(fetchWomenProducts.rejected, (state, action)=>{
            state.womenProducts.status = "failed"
            state.womenProducts.error = action.error.message
        })
    }
})

export default productSlice.reducer