import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import { Login, Signup, VerifyAccount } from "../pages/auth";
import PlaceOrder from "../pages/PlaceOrder";
import PrivateRoute from "./PrivateRoute";
import AuthRoute from "./AuthRoute";
import { withSentryReactRouterV7Routing } from "@sentry/react";
import { ScreenLoading } from "../components/Loaders";

// lazy import(Route Splitting)
const HomePage = lazy(() => import("../pages/HomePage"));
const MenProducts = lazy(() => import("../pages/MenProducts"));
const WomenProducts = lazy(() => import("../pages/WomenProducts"));
const TopSelling = lazy(() => import("../pages/TopSelling"));
const NewProducts = lazy(() => import("../pages/NewProducts"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));
const Preview = lazy(() => import("../pages/Preview"));
const Profile = lazy(() => import("../pages/Profile"));

export const AppRoutes = () => {
  const SentryRoutes = withSentryReactRouterV7Routing(Routes);

  return (
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
  );
};
