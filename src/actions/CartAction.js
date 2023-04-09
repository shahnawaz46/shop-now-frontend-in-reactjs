// import { cartConstant, messageConstants } from "./Constants";
// import Axios from "../axios/Axios";
// import Store from '../store/Store';


// export const getCartItem = () => {
//     return async (dispatch) => {
//         try {
//             const res = await Axios.get('user/carItem/get')
//             dispatch({
//                 type: cartConstant.GET_ITEM_FROM_CART_SUCCESS,
//                 payload: {
//                     allCartItem: res.data.allCartItem
//                 }
//             })
//         } catch (error) {
//             error.response &&
//                 dispatch({
//                     type: cartConstant.GET_ITEM_FROM_CART_FAIL,
//                     payload: {
//                         error: error.response.data.error
//                     }
//                 })
//         }
//     }
// }


// export const addToCart = (product, singleProduct = null) => {
//     return async (dispatch) => {
//         try {
//             const { user } = Store.getState()
//             if (user.authenticate) {
//                 const res = await Axios.post('user/product/add_to_cart', product)
//                 dispatch({
//                     type: cartConstant.ADD_TO_CART_SUCCESS,
//                     payload: {
//                         message: res.data.message
//                     }
//                 })
//             } else {
//                 let cartProductArray = localStorage.getItem("cartItem") ? JSON.parse(localStorage.getItem("cartItem")) : []

//                 let productIndex = cartProductArray?.findIndex((value) => value.productId._id == product[0].productId && value.size === product[0].size)

//                 if (cartProductArray?.length > 0 && productIndex >= 0) {
//                     cartProductArray[productIndex].qty += product[0].qty
//                     if (cartProductArray[productIndex].qty == 0) {
//                         return null
//                     }
//                     localStorage.setItem("cartItem", JSON.stringify(cartProductArray))

//                 } else {
//                     const { _id, productName, sellingPrice, productPictures } = singleProduct
//                     const cartProduct = { productId: { _id, productName, sellingPrice, productPictures }, qty: 1, size: product[0].size }
//                     localStorage.setItem("cartItem", JSON.stringify([...cartProductArray, cartProduct]))
//                 }

//                 dispatch({
//                     type: cartConstant.GET_ITEM_FROM_CART_SUCCESS,
//                     payload: {
//                         allCartItem: JSON.parse(localStorage.getItem("cartItem"))
//                     }
//                 })
//             }
//         } catch (error) {
//             console.log(error)
//             error.response &&
//                 dispatch({
//                     type: cartConstant.ADD_TO_CART_FAIL,
//                     payload: {
//                         error: error.response.data.error
//                     }
//                 })
//         }
//     }
// }


// export const removeCartItem = (productId, size) => {
//     return async (dispatch) => {
//         try {
//             const { user } = Store.getState()
//             if (user.authenticate) {
//                 const res = await Axios.post('user/carItem/remove', { productId, size })
//                 dispatch({
//                     type: cartConstant.REMOVE_CART_ITEM_SUCCESS,
//                     payload: {
//                         message: res.data.message
//                     }
//                 })
//             } else {
//                 let cartItem = JSON.parse(localStorage.getItem("cartItem"))
//                 const itemIndex = cartItem.findIndex((value) => value.productId._id === productId && value.size === size)
//                 cartItem.splice(itemIndex, 1)
//                 localStorage.setItem("cartItem", JSON.stringify(cartItem))
//                 dispatch({
//                     type: cartConstant.GET_ITEM_FROM_CART_SUCCESS,
//                     payload: {
//                         allCartItem: cartItem
//                     }
//                 })
//             }
//         } catch (error) {
//             error.response &&
//                 dispatch({
//                     type: cartConstant.REMOVE_CART_ITEM_FAIL,
//                     payload: {
//                         error: error.response.data.error
//                     }
//                 })
//         }
//     }
// }

// export const clearCartState = () => {
//     return (dispatch) => {
//         dispatch({
//             type: cartConstant.REMOVE_CART_ITEM_FROM_STATE
//         })
//     }
// }

// export const removeCartMessage = () => {
//     return (dispatch) => {
//         dispatch({
//             type: messageConstants.REMOVE_CART_MESSAGE
//         })
//     }
// }