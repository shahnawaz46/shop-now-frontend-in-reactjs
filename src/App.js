import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollTop from './components/ScrollTop';
import Toastify from './utils/Toastify';
import { useDispatch, useSelector } from 'react-redux';

// components
import Loader from './components/Loader';
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
import { fetchHomePageProducts } from './redux/slices/ProductSlice';
import { getCartItem } from './redux/slices/CartSlice';
import { Login, Signup } from './authentication';
import { AuthPrivateRoute, PrivateRoute } from './routes';

function App() {
  const dispatch = useDispatch();
  // const userState = useSelector((state) => state.user)

  // useEffect(() => {
  //   if (!userState.authenticate) {
  //     dispatch(isUserLogin())
  //   }
  //   dispatch(getAllCategory())
  //   dispatch(getFeaturedProducts())
  //   dispatch(getBanner())
  // }, [])

  // after login or logout this useEffect will execute and call action for get cartItem through api
  // useEffect(() => {
  //   const cartItem = localStorage.getItem("cartItem") ? JSON.parse(localStorage.getItem("cartItem")) : null
  //   if (userState.authenticate) {
  //     if (cartItem) {
  //       let cart = []
  //       cartItem.forEach((item) => {
  //         cart.push({ productId: item.productId._id, qty: item.qty, size: item.size })
  //       })
  //       localStorage.removeItem("cartItem")
  //       dispatch(addToCart(cart))
  //     }
  //     dispatch(getCartItem())
  //   }
  //   else if (!userState.authenticate) {
  //     dispatch(clearCartState())
  //     if (cartItem) {
  //       dispatch({
  //         type: cartConstant.GET_ITEM_FROM_CART_SUCCESS,
  //         payload: {
  //           allCartItem: JSON.parse(localStorage.getItem("cartItem"))
  //         }
  //       })
  //     }
  //   }
  // }, [userState.authenticate])

  useEffect(() => {
    // console.log("useEffect App.js");
    dispatch(fetchHomePageProducts());
    dispatch(getCartItem());
  }, []);

  return (
    <Router>
      <ScrollTop />
      <Toastify />
      <Routes>
        {/* <Route path="/" exact component={Loader} /> */}
        <Route index element={<Loader />} />

        <Route path="/home" element={<HomePage />} />

        <Route path="collections">
          <Route path="Men's-Wardrobe" element={<MenProducts />} />
          {/* <Route path="Men's-Wardrobe/:subSlug" element={<MenProducts />} /> */}
          <Route path="Women's-Wardrobe" element={<WomenProducts />} />
          <Route path="Women's-Wardrobe/:subSlug" element={<WomenProducts />} />
        </Route>

        <Route path="/top-selling" element={<TopSelling />} />
        <Route path="/new-products" element={<NewProducts />} />
        <Route path="/preview/:productId" element={<Preview />} />
        <Route
          path="/my-account/:page"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />

        {/* <Route path="/collections/:categorySlug" exact component={MenAndWomenCategoryPage} /> */}

        {/* <Route path="/collections/:categorySlug/:subCategorySlug" exact component={MenAndWomenCategoryPage} /> */}

        {/* <Route path="/place-order/:productIdAndSize" component={placeOrder}/> */}

        <Route
          path="/login"
          element={
            <AuthPrivateRoute>
              <Login />
            </AuthPrivateRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthPrivateRoute>
              <Signup />
            </AuthPrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
