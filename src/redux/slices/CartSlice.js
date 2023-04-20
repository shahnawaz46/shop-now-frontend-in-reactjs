import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    items:[],
    totalCost:null,
    totalQty:0,
}

export const addToCart = createAsyncThunk("cart/addToCart", async(product)=>{
    // console.log(product)
    const _userId = localStorage.getItem("__f_id")

    // if user is logged in then call the api and store cartItem into db
    // otherwise store the cartItem into LocalStorage
    if(_userId){
        console.log("Yes")
    }else{
        const isCartItemPresent = localStorage.getItem("__f_cartItem")
        if(!isCartItemPresent){
            localStorage.setItem("__f_cartItem",JSON.stringify([product]))
        }else{
            const parseCartItem = JSON.parse(isCartItemPresent)
            const index = parseCartItem.findIndex((item)=> item._id === product._id && item.size === product.size)
            if(index >= 0){
                parseCartItem[index].qty += product.qty;
                localStorage.setItem("__f_cartItem",JSON.stringify(parseCartItem))
            }else{
                parseCartItem.push(product)
                localStorage.setItem("__f_cartItem",JSON.stringify(parseCartItem))
            }
        }
        
    }

    return product
})

export const getCartItem = createAsyncThunk("cart/getCartItem", async()=>{
    const _userId = localStorage.getItem("__f_id")

    // if user is logged in then call the api and get cartItem from db
    // otherwise get cartItem from LocalStorage
    if(_userId){
        console.log("Yes")
    }else{
        const isCartItemPresent = localStorage.getItem("__f_cartItem")
        return isCartItemPresent ? JSON.parse(isCartItemPresent) : []
    }

    return []
})

export const removeCartItem = createAsyncThunk("cart/removeCartItem", async(product)=>{
    const _userId = localStorage.getItem("__f_id")

    // if user is logged in then call the api and remove cartItem from db
    // otherwise remove cartItem from LocalStorage
    if(_userId){
        console.log("Yes")
    }else{
        const parseCartItem = JSON.parse(localStorage.getItem("__f_cartItem"))
        const removedProductIndex = parseCartItem.findIndex((item)=> item._id === product._id && item.size === product.size)
        parseCartItem.splice(removedProductIndex,1)
        localStorage.setItem("__f_cartItem",JSON.stringify(parseCartItem))
        console.log(parseCartItem, removedProductIndex)
        return {parseCartItem, removedProductIndex}
    }
})

const cartSlice = createSlice({
    name:'cart',
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(addToCart.fulfilled, (state, action)=>{
            // iterating the array and checking wheather item is already present or not
            // if item is already present in the Cart then increment the quantity
            // else push the item into Cart
            const index = state.items.findIndex((item)=> item._id === action.payload._id && item.size === action.payload.size)
            index >= 0 ? state.items[index].qty += action.payload.qty : state.items.push(action.payload)
 
            state.totalCost += action.payload.sellingPrice
            state.totalQty += action.payload.qty
        })
        .addCase(getCartItem.fulfilled, (state, action)=>{
            state.items.push(...action.payload)

            // with the help of reduce combining totalCost and totalQty
            state.totalCost = action.payload.reduce((total, value)=> (total + value.sellingPrice)*value.qty, 0)
            state.totalQty = action.payload.reduce((total, value)=> total + value.qty, 0)
        })
        .addCase(removeCartItem.fulfilled, (state, action)=>{
            // const removedProduct = state.items.find((product)=>product._id === action.payload.product._id && product.size === action.payload.product.size)
            const {parseCartItem, removedProductIndex:index} = action.payload
            const newCost = state.totalCost - state.items[index].sellingPrice * state.items[index].qty
            const newQty = state.totalQty - state.items[index].qty
            console.log(parseCartItem,index, newCost, newQty)

            return {
                ...state,
                items: [...parseCartItem],
                totalCost: newCost,
                totalQty: newQty
            }
        })
    }
    
})

// export const {addToCart} = cartSlice.actions

export default cartSlice.reducer