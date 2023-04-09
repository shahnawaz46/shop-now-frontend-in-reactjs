// import {
//     loginConstants,
//     userProfileConstants,
//     signupConstants,
//     logoutConstants,
//     messageConstants
// } from './Constants';
// import Axios from '../axios/Axios';

// export const userSignup = (form) => {
//     return async (dispatch) => {
//         try {
//             dispatch({ type: signupConstants.SIGNUP_REQUEST })

//             const res = await Axios.post('/user/signup', form)
//             localStorage.setItem("__xyz__", "true")
//             dispatch({
//                 type: signupConstants.SIGNUP_SUCCESS,
//                 payload: {
//                     message: res.data.message
//                 }
//             })

//         } catch (error) {
//             error.response &&
//                 dispatch({
//                     type: signupConstants.SIGNUP_FAIL,
//                     payload: {
//                         error: error.response.data.error
//                     }
//                 })
//         }
//     }
// }


// export const userLogin = (form) => {
//     return async (dispatch) => {
//         try {
//             dispatch({ type: loginConstants.LOGIN_REQUEST })

//             const res = await Axios.post('/user/signin', form)
//             localStorage.setItem("__xyz__", "true")
//             dispatch({
//                 type: loginConstants.LOGIN_SUCCESS,
//                 payload: {
//                     message: res.data.message
//                 }
//             })

//         } catch (error) {
//             error.response &&
//                 dispatch({
//                     type: loginConstants.LOGIN_FAIL,
//                     payload: {
//                         error: error.response.data.error
//                     }
//                 })
//         }
//     }
// }


// export const isUserLogin = () => {
//     return (dispatch) => {
//         const token = localStorage.getItem('__xyz__')
//         if (token) {
//             dispatch({
//                 type: loginConstants.LOGIN_SUCCESS,
//                 payload: {
//                     message: "User Already Login"
//                 }
//             })
//         }
//     }
// }


// export const userLogout = () => {
//     return async (dispatch) => {
//         try {
//             const res = await Axios.post('/user/signout')
//             localStorage.clear()

//             dispatch({
//                 type: logoutConstants.LOGOUT_SUCCESS,
//                 payload: {
//                     message: res.data.message
//                 }
//             })

//         } catch (error) {
//             error.response &&
//                 dispatch({
//                     type: logoutConstants.LOGOUT_FAIL,
//                     payload: {
//                         error: error.response.data.error
//                     }
//                 })
//         }
//     }
// }

// export const getUserProfile = () => {
//     return async (dispatch) => {
//         try {
//             dispatch({ type: userProfileConstants.GET_USER_PROFILE_REQUEST })
//             const res = await Axios.get('/user/profile')
//             dispatch({
//                 type: userProfileConstants.GET_USER_PROFILE_SUCCESS,
//                 payload: {
//                     userDetail: res.data.userDetail
//                 }
//             })
//         } catch (error) {
//             error.response &&
//                 dispatch({
//                     type: userProfileConstants.GET_USER_PROFILE_FAIL,
//                     payload: {
//                         error: error.response.data.error
//                     }
//                 })
//         }
//     }
// }

// export const updateProfilePic = (form) => {
//     return async (dispatch) => {
//         try {
//             const res = await Axios.post('/user/updateProfilePic', form)
//             dispatch({
//                 type: userProfileConstants.UPDATE_USER_PROFILE_PIC_SUCCESS,
//                 payload: {
//                     message: res.data.message
//                 }
//             })
//         } catch (error) {
//             error.response &&
//                 dispatch({
//                     type: userProfileConstants.UPDATE_USER_PROFILE_PIC_FAIL,
//                     payload: {
//                         error: error.response.data.error
//                     }
//                 })
//         }
//     }
// }

// export const editUserProfileDetail = (userDetail) => {
//     return async (dispatch) => {
//         try {
//             const res = await Axios.post('/user/updateDetail', userDetail)
//             dispatch({
//                 type: userProfileConstants.UPDATE_USER_PROFILE_DETAIL_SUCCESS,
//                 payload: {
//                     message: res.data.message
//                 }
//             })
//         } catch (error) {
//             error.response &&
//                 dispatch({
//                     type: userProfileConstants.UPDATE_USER_PROFILE_DETAIL_FAIL,
//                     payload: {
//                         error: error.response.data.error
//                     }
//                 })
//         }

//     }
// }

// export const loginErrorRemove = () => {
//     return (dispatch) => {
//         dispatch({
//             type: messageConstants.REMOVE_LOGIN_ERROR
//         })
//     }
// }