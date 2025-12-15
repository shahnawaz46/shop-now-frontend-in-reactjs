import { useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { withSentryReactRouterV7Routing } from "@sentry/react";

// components
import ScrollTop from "./components/ScrollTop";
import Toastify from "./components/Toastify";
import { getCartItem } from "./redux/slices/CartSlice";
import { Login, Signup, VerifyAccount } from "./pages/auth";
import { AuthRoute, PrivateRoute } from "./routes";
import PlaceOrder from "./pages/PlaceOrder";
import ScreenLoading from "./components/Loaders/ScreenLoading";
import { useAppDispatch } from "./redux/hooks";
import { fetchAuthDetails } from "./redux/slices/AuthSlice";

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
    await dispatch(fetchAuthDetails());
    await dispatch(getCartItem());
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  const SentryRoutes = withSentryReactRouterV7Routing(Routes);

  return (
    <Router>
      <ScrollTop />
      <Toastify />

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

          <Route element={<PrivateRoute />}>
            <Route path="/my-account/:page" element={<Profile />} />
          </Route>

          <Route element={<AuthRoute />}>
            <Route path="/account/login" element={<Login />} />
            <Route path="/account/signup" element={<Signup />} />
            <Route path="/account/verify" element={<VerifyAccount />} />
          </Route>
        </SentryRoutes>
      </Suspense>
    </Router>
  );
}

export default App;
