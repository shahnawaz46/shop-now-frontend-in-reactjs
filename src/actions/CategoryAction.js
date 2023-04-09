// import { categoryConstants } from './Constants';
// import Axios from '../axios/Axios';

// export const getAllCategory = () => {
//     return async (dispatch) => {
//         try {
//             const res = await Axios.get("/category/get")
//             dispatch({
//                 type: categoryConstants.GET_CATEGORY_SUCCESS,
//                 payload: {
//                     categories: res.data.categories
//                 }
//             })
//         } catch (error) {
//             error.response &&
//                 dispatch({
//                     type: categoryConstants.GET_CATEGORY_FAIL,
//                     payload: {
//                         error: error.response.data.error
//                     }
//                 })
//         }
//     }
// }