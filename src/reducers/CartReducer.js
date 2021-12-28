import { cartConstant, messageConstants } from "../actions/Constants";

const initialState = {
    allCartItem: [],
    message: null,
    error: null
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case cartConstant.GET_ITEM_FROM_CART_SUCCESS:
            return {
                ...state,
                allCartItem: action.payload.allCartItem
            }

        case cartConstant.GET_ITEM_FROM_CART_FAIL:
        case cartConstant.REMOVE_CART_ITEM_FAIL:
        case cartConstant.ADD_TO_CART_FAIL:
            return {
                ...state,
                error: action.payload.error
            }

        case cartConstant.ADD_TO_CART_SUCCESS:
        case cartConstant.REMOVE_CART_ITEM_SUCCESS:
            return {
                ...state,
                message: action.payload.message
            }

        case cartConstant.REMOVE_CART_ITEM_FROM_STATE:
            return initialState

        case messageConstants.REMOVE_CART_MESSAGE:
            return {
                ...state,
                message: null
            }

        default:
            return state
    }
}

export default cartReducer;