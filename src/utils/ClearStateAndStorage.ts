// components
import { logout } from '../redux/slices/UserSlice';
import store from '../redux/store';

export const clearStateAndStorage = async () => {
  localStorage.removeItem('__f_id');
  store.dispatch(logout());
};
