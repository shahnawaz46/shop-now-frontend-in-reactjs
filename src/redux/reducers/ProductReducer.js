// import { productConstants } from "../actions/Constants"

// const initialState = {
//     products: [],
//     error: null,
//     loading: false,
//     singleProduct: null,
//     featuredProduct: []
// }

// const productReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case productConstants.GET_ALL_PRODUCT_REQUEST:
//         case productConstants.GET_SINGLE_PRODUCT_REQUEST:
//             return {
//                 ...state,
//                 loading: true
//             }

//         case productConstants.GET_ALL_PRODUCT_SUCCESS:
//             return {
//                 ...state,
//                 products: action.payload.products,
//                 loading: false
//             }

//         case productConstants.GET_ALL_PRODUCT_FAIL:
//         case productConstants.GET_SINGLE_PRODUCT_FAIL:
//             return {
//                 ...state,
//                 loading: false,
//                 error: action.payload.error
//             }

//         case productConstants.GET_SINGLE_PRODUCT_SUCCESS:
//             return {
//                 ...state,
//                 singleProduct: action.payload.product,
//                 loading: false
//             }

//         case productConstants.GET_FEATURED_PRODUCT_SUCCESS:
//             return {
//                 ...state,
//                 featuredProduct: action.payload.featuredProduct
//             }

//         case productConstants.GET_FEATURED_PRODUCT_FAIL:
//             return {
//                 ...state,
//                 error: action.payload.error
//             }

//         default:
//             return state
//     }
// }

// export default productReducer;