// import { userAddressConstant } from './Constants'
// import Axios from "../axios/Axios";

// export const getAddress = () => {
//     return async dispatch => {
//         try {
//             const res = await Axios.get('/user/getAddress')
//             dispatch({
//                 type: userAddressConstant.GET_USER_ADDRESS_SUCCESS,
//                 payload: {
//                     userAddress: res.data.userAddress
//                 }
//             })
//         } catch (error) {
//             error.response && dispatch({
//                 type: userAddressConstant.GET_USER_ADDRESS_FAILURE,
//                 payload: {
//                     error: error.response.data.error
//                 }
//             })
//         }
//     }
// }

// export const addAddress = (userAddress) => {
//     return async dispatch => {
//         try {
//             const res = await Axios.post('/user/addAddress', userAddress)
//             dispatch({
//                 type: userAddressConstant.ADD_USER_ADDRESS_SUCCESS,
//                 payload: {
//                     message: res.data.message
//                 }
//             })
//         } catch (error) {
//             error.response && dispatch({
//                 type: userAddressConstant.ADD_USER_ADDRESS_FAILURE,
//                 payload: { error: error.response.data.error }
//             })
//         }
//     }
// }


// export const removeAddress = (addressId) => {
//     return async (dispatch) => {
//         try {
//             const res = await Axios.post('/user/removeAddress', { addressId })
//             dispatch({
//                 type: userAddressConstant.DELETE_USER_ADDRESS_SUCCESS,
//                 payload: {
//                     message: res.data.message
//                 }
//             })

//         } catch (error) {
//             error.response && dispatch({
//                 type: userAddressConstant.DELETE_USER_ADDRESS_FAILURE,
//                 payload: {
//                     error: error.response.data.error
//                 }
//             })
//         }
//     }
// }


// export const removeAddressMessageAndError = () => {
//     return (dispatch) => {
//         dispatch({
//             type: userAddressConstant.REMOVE_ADDRESS_MESSAGE_ERROR
//         })
//     }
// }