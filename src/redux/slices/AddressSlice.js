import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/AxiosInstance";

const initialState = {
    status: 'idle',
    addressDetails: [],
    // orderDetails: [],
    error: null
}

export const fetchAddress = createAsyncThunk("address/fetch", async()=>{
    try{
        const res = await axiosInstance.get("/user/getAddress")
        return res.data.userAddress

    }catch(error){
        if(error?.response?.data?.msg){
            console.log(error?.response?.data?.msg)
            throw new Error(error?.response?.data?.msg)
        }
        else {
            console.log(error)
            throw new Error(error)
        }
    }
}) 

const addressSlice = createSlice({
    name:'address',
    initialState,
    reducers:{
        updateAddress: (state, action)=>{
            state.addressDetails = action.payload
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(fetchAddress.pending, (state,action)=>{
            state.status = 'pending'
        })
        .addCase(fetchAddress.fulfilled, (state,action)=>{
            state.status = "success",
            state.addressDetails = action.payload
        })
        .addCase(fetchAddress.rejected, (state, action)=>{
            state.status = "failed",
            state.error = action.error.message
        })
    }
})

export const { updateAddress } = addressSlice.actions

export default addressSlice.reducer