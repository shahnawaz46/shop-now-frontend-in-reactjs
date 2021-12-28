import { combineReducers } from "redux";
import categoryReducer from "./CategoryReducer";
import productReducer from "./ProductReducer";
import LoginSignupReducer from './LoginSignupReducer';
import bannerReducer from "./BannerReducer";
import cartReducer from './CartReducer';
import addressReducer from "./AddressReducer";

const rootReducer = combineReducers({
    category: categoryReducer,
    product: productReducer,
    user: LoginSignupReducer,
    banner: bannerReducer,
    cart: cartReducer,
    address: addressReducer
});

export default rootReducer;