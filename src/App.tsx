import { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';

// components
import ScrollTop from './components/ScrollTop';
import Toastify from './components/Toastify';
import { getCartItem } from './redux/slices/CartSlice';
import { Login, Signup, VerifyAccount } from './pages/auth';
import { AuthPrivateRoute, PrivateRoute } from './routes';
import PlaceOrder from './pages/PlaceOrder';
import ScreenLoading from './components/Loaders/ScreenLoading';
import { useAppDispatch } from './redux/hooks';

// lazy import(Route Splitting)
const HomePage = lazy(() => import('./pages/HomePage'));
const MenProducts = lazy(() => import('./pages/MenProducts'));
const WomenProducts = lazy(() => import('./pages/WomenProducts'));
const TopSelling = lazy(() => import('./pages/TopSelling'));
const NewProducts = lazy(() => import('./pages/NewProducts'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));
const Preview = lazy(() => import('./pages/Preview'));
const Profile = lazy(() => import('./pages/Profile'));

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // console.log("useEffect App.js");
    dispatch(getCartItem());
  }, []);

  return (
    <Router>
      <ScrollTop />
      <Toastify />

      <Suspense fallback={<ScreenLoading />}>
        <Routes>
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
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
