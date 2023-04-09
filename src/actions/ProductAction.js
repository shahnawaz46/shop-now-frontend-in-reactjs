// import Axios from '../axios/Axios';
// import { productConstants } from "./Constants";

// export const getAllProductBySlug = (slug) => {
//     return async (dispatch) => {
//         try {
//             dispatch({ type: productConstants.GET_ALL_PRODUCT_REQUEST })
//             const res = await Axios.post(`product/show/${slug}`)

//             dispatch({
//                 type: productConstants.GET_ALL_PRODUCT_SUCCESS,
//                 payload: {
//                     products: res.data.products
//                 }
//             })
//         } catch (error) {
//             error.response &&
//                 dispatch({
//                     type: productConstants.GET_ALL_PRODUCT_FAIL,
//                     payload: {
//                         error: error.response.data.error
//                     }
//                 })
//         }
//     }
// }


// export const getSingleProductById = (productId) => {
//     return async (dispatch) => {
//         try {
//             dispatch({ type: productConstants.GET_SINGLE_PRODUCT_REQUEST })

//             const res = await Axios.post(`/product/single/${productId}`)
//             dispatch({
//                 type: productConstants.GET_SINGLE_PRODUCT_SUCCESS,
//                 payload: {
//                     product: res.data.product
//                 }
//             })
//         } catch (error) {
//             error.response &&
//                 dispatch({
//                     type: productConstants.GET_SINGLE_PRODUCT_FAIL,
//                     payload: {
//                         error: error.response.data.error
//                     }
//                 })
//         }
//     }
// }

// export const getFeaturedProducts = () => {
//     return async (dispatch) => {
//         try {
//             const res = await Axios.post('/product/featured-product')
//             dispatch({
//                 type: productConstants.GET_FEATURED_PRODUCT_SUCCESS,
//                 payload: {
//                     featuredProduct: res.data.product
//                 }
//             })

//         } catch (error) {
//             error.response &&
//                 dispatch({
//                     type: productConstants.GET_FEATURED_PRODUCT_FAIL,
//                     payload: {
//                         error: error.response.data.error
//                     }
//                 })
//         }
//     }
// }