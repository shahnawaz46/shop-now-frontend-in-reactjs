import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router";

// components
import ScrollTop from "./components/ScrollTop";
import Toastify from "./components/Toastify";
import { useAppDispatch } from "./redux/hooks";
import { fetchAuthDetails } from "./redux/slices/AuthSlice";
import { getCartItem } from "./redux/slices/CartSlice";
import { AppRoutes } from "./routes";

function App() {
  const dispatch = useAppDispatch();

  const checkAuthentication = async () => {
    await dispatch(fetchAuthDetails());
    await dispatch(getCartItem());
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  return (
    <Router>
      <ScrollTop />
      <Toastify />

      <AppRoutes />
    </Router>
  );
}

export default App;
