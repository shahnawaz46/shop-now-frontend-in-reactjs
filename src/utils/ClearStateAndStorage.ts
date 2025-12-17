// components
import { clearToken } from "../services/tokenService";

export const clearStateAndStorage = async () => {
  const { default: store } = await import("../redux/store");
  const { emptyCart } = await import("../redux/slices/CartSlice");
  const { logout } = await import("../redux/actions");

  clearToken();

  store.dispatch(logout());
  store.dispatch(emptyCart());
};
