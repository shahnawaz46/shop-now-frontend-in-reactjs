import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// components
import { IndexPageLoading } from './components/Loaders';
import {
  HomePage,
  MenProducts,
  WomenProducts,
  TopSelling,
  NewProducts,
  PageNotFound,
  Preview,
  Profile,
} from './pages';
import ScrollTop from './components/ScrollTop';
import Toastify from './utils/Toastify';
import { getCartItem } from './redux/slices/CartSlice';
import { Login, Signup, VerifyAccount } from './pages/account';
import { AuthPrivateRoute, PrivateRoute } from './routes';
import PlaceOrder from './pages/PlaceOrder';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log("useEffect App.js");
    dispatch(getCartItem());
  }, []);

  return (
    <Router>
      <ScrollTop />
      <Toastify />
      <Routes>
        <Route index element={<IndexPageLoading />} />
        <Route path="/home" element={<HomePage />} />
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
    </Router>
  );
}

export default App;
