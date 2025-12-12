// components
import store from "../redux/store";
import { emptyCart } from "../redux/slices/CartSlice";
import { logout } from "../redux/actions";

export const clearStateAndStorage = async () => {
  localStorage.removeItem("__f_id");
  store.dispatch(logout());
  store.dispatch(emptyCart());
};
