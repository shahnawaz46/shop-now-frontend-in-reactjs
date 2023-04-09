// import { categoryConstants } from "../actions/Constants"

// const initialState = {
//     categories: [],
//     error: null
// }

// const categoryReducer = (state = initialState, action) => {
//     switch (action.type) {

//         case categoryConstants.GET_CATEGORY_SUCCESS:
//             return {
//                 ...state,
//                 categories: action.payload.categories,
//             }

//         case categoryConstants.GET_CATEGORY_FAIL:
//             return {
//                 ...state,
//                 error: action.payload.error,
//             }

//         default:
//             return state
//     }
// }

// export default categoryReducer;