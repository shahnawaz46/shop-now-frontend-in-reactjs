import {
    loginConstants,
    userProfileConstants,
    logoutConstants,
    signupConstants,
    messageConstants
} from "../actions/Constants";

const initialState = {
    authenticate: false,
    authenticating: false,
    userDetail: {},
    message: null,
    updatedMessage: null,
    loading: false,
    error: null
}

const signupReducer = (state = initialState, action) => {
    switch (action.type) {
        case signupConstants.SIGNUP_REQUEST:
        case loginConstants.LOGIN_REQUEST:
            return {
                ...state,
                authenticating: true
            }

        case signupConstants.SIGNUP_SUCCESS:
        case loginConstants.LOGIN_SUCCESS:
            return {
                ...state,
                message: action.payload.message,
                authenticating: false,
                authenticate: true
            }

        case signupConstants.SIGNUP_FAIL:
        case loginConstants.LOGIN_FAIL:
            return {
                ...state,
                authenticating: false,
                error: action.payload.error
            }

        case logoutConstants.LOGOUT_SUCCESS:
            return {
                ...initialState
            }

        case logoutConstants.LOGOUT_FAIL:
        case userProfileConstants.UPDATE_USER_PROFILE_PIC_FAIL:
        case userProfileConstants.UPDATE_USER_PROFILE_DETAIL_FAIL:
            return {
                ...state,
                error: action.payload.error
            }

        case userProfileConstants.GET_USER_PROFILE_REQUEST:
            return {
                ...state,
                loading: true
            }

        case userProfileConstants.GET_USER_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                userDetail: action.payload.userDetail
            }

        case userProfileConstants.GET_USER_PROFILE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }

        case userProfileConstants.UPDATE_USER_PROFILE_PIC_SUCCESS:
        case userProfileConstants.UPDATE_USER_PROFILE_DETAIL_SUCCESS:
            return {
                ...state,
                updatedMessage: action.payload.message
            }

        case messageConstants.REMOVE_LOGIN_ERROR:
            return {
                ...state,
                error: null,
                updatedMessage: null,
            }

        default:
            return state
    }
}

export default signupReducer;