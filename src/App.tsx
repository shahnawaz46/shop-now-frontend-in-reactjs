import { useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { withSentryReactRouterV7Routing } from "@sentry/react";

// components
import ScrollTop from "./components/ScrollTop";
import Toastify from "./components/Toastify";
import { getCartItem } from "./redux/slices/CartSlice";
import { Login, Signup, VerifyAccount } from "./pages/auth";
import { AuthPrivateRoute, PrivateRoute } from "./routes";
import PlaceOrder from "./pages/PlaceOrder";
import ScreenLoading from "./components/Loaders/ScreenLoading";
import { useAppDispatch } from "./redux/hooks";
import axiosInstance from "./axios/AxiosInstance";

// lazy import(Route Splitting)
const HomePage = lazy(() => import("./pages/HomePage"));
const MenProducts = lazy(() => import("./pages/MenProducts"));
const WomenProducts = lazy(() => import("./pages/WomenProducts"));
const TopSelling = lazy(() => import("./pages/TopSelling"));
const NewProducts = lazy(() => import("./pages/NewProducts"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const Preview = lazy(() => import("./pages/Preview"));
const Profile = lazy(() => import("./pages/Profile"));

function App() {
  const dispatch = useAppDispatch();

  const checkAuthentication = async () => {
    try {
      await axiosInstance.get("/authenticated");
    } catch (err) {
      localStorage.getItem("__f_id") && localStorage.removeItem("__f_id");
    } finally {
      dispatch(getCartItem());
    }
  };

  useEffect(() => {
    // console.log("useEffect App.js");
    checkAuthentication();
  }, []);

  const SentryRoutes = withSentryReactRouterV7Routing(Routes);

  return (
    <Router>
      <ScrollTop />
      <Toastify />
      <button
        onClick={() => {
          throw new Error("This is your first error!");
        }}
      >
        Break the world
      </button>
      ;
      <Suspense fallback={<ScreenLoading />}>
        <SentryRoutes>
          <Route index element={<HomePage />} />
          <Route path="collections">
            <Route path="Men's-Wardrobe" element={<MenProducts />} />
            <Route path="Women's-Wardrobe" element={<WomenProducts />} />
          </Route>
          <Route path="/top-selling" element={<TopSelling />} />
          <Route path="/new-products" element={<NewProducts />} />
          <Route path="/preview/:productId" element={<Preview />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="*" element={<PageNotFound />} />

          <Route
            path="/my-account/:page"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />

          <Route
            path="/account/login"
            element={
              <AuthPrivateRoute>
                <Login />
              </AuthPrivateRoute>
            }
          />
          <Route
            path="/account/signup"
            element={
              <AuthPrivateRoute>
                <Signup />
              </AuthPrivateRoute>
            }
          />

          <Route
            path="/account/verify"
            element={
              <AuthPrivateRoute>
                <VerifyAccount />
              </AuthPrivateRoute>
            }
          />
        </SentryRoutes>
      </Suspense>
    </Router>
  );
}

export default App;
