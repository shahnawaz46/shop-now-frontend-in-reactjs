import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axiosInstance from '../../axios/AxiosInstance'

const initialState = {
    status: 'idle',
    error: null,
    personalDetails: {},
    addressDetails: [],
    orderDetails: [],
}

export const fetchPersonalDetails = createAsyncThunk("personalDetail/fetch", async()=>{
    try{
        const res = await axiosInstance.get("/user/profile")
        return res.data

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

export const editPersonalDetails = createAsyncThunk("personalDetail/update", async(userDetail)=>{
    try{
        const res = await axiosInstance.patch("/user/updateProfile",{userDetail})
        return res.data.userDetail

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

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        logout: (state)=>{
            return {...initialState}
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(fetchPersonalDetails.pending, (state, action)=>{
            state.status = 'pending'
        })
        .addCase(fetchPersonalDetails.fulfilled, (state, action)=>{
            state.status = "success",
            state.personalDetails = action.payload.userDetail
            state.addressDetails = action.payload.userAddress
        })
        .addCase(fetchPersonalDetails.rejected, (state, action)=>{
            state.status = "failed",
            state.error = action.error.message
        })
        .addCase(editPersonalDetails.fulfilled, (state, action)=>{
            state.personalDetails = action.payload
        })
        .addCase(editPersonalDetails.rejected, (state, action)=>{
            state.status = "failed",
            state.error = action.error.message
        })
    }
})

export const { logout } = userSlice.actions

export default userSlice.reducer
