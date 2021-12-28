import { userAddressConstant } from '../actions/Constants'

const initialState = {
    address: [],
    addressMessage: null,
    addressError: null
}

const addressReducer = (state = initialState, action) => {
    switch (action.type) {
        case userAddressConstant.ADD_USER_ADDRESS_SUCCESS:
        case userAddressConstant.DELETE_USER_ADDRESS_SUCCESS:
            return {
                ...state,
                addressMessage: action.payload.message,
            }

        case userAddressConstant.ADD_USER_ADDRESS_FAILURE:
        case userAddressConstant.DELETE_USER_ADDRESS_FAILURE:
            return {
                ...state,
                addressError: action.payload.error
            }

        case userAddressConstant.GET_USER_ADDRESS_SUCCESS:
            return {
                ...state,
                address: action.payload.userAddress
            }

        case userAddressConstant.GET_USER_ADDRESS_FAILURE:
            return {
                ...state,
                address: [],
                addressError: action.payload.error
            }

        case userAddressConstant.REMOVE_ADDRESS_MESSAGE_ERROR:
            return {
                ...state,
                addressMessage: null,
                addressError: null
            }


        default:
            return state
    }
}

export default addressReducer