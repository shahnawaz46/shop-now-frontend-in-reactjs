import React, { useEffect } from 'react';
import Loader from './components/js/Loader';
import HomePage from './components/js/HomePage';
import MenAndWomenCategoryPage from './components/js/MenAndWomenCategoryPage';
import TopSelling from './components/js/TopSelling';
import Preview from './components/js/Preview';
import Cart from './components/js/Cart';
import UserProfile from './components/js/UserProfile';
import AllReview from './components/js/AllReview';
import Login from './components/authentication/Login';
import Signup from './components/authentication/Signup';
import PageNotFound from './components/js/PageNotFound';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ScrollTop from './components/js/ScrollTop';
import placeOrder from './components/js/PlaceOrder'

import { useDispatch, useSelector } from 'react-redux';
import { cartConstant } from './actions/Constants';

// actions
import { getAllCategory } from './actions/CategoryAction';
import { isUserLogin } from './actions/LoginSignupAction';
import { getBanner } from './actions/BannerAction';
import { getCartItem, clearCartState, addToCart } from './actions/CartAction';
import { getFeaturedProducts } from './actions/ProductAction';


function App() {
  const dispatch = useDispatch()
  const userState = useSelector((state) => state.user)

  useEffect(() => {
    if (!userState.authenticate) {
      dispatch(isUserLogin())
    }
    dispatch(getAllCategory())
    dispatch(getFeaturedProducts())
    dispatch(getBanner())
  }, [])

  // after login or logout this useEffect will execute and call action for get cartItem through api
  useEffect(() => {
    const cartItem = localStorage.getItem("cartItem") ? JSON.parse(localStorage.getItem("cartItem")) : null
    if (userState.authenticate) {
      if (cartItem) {
        let cart = []
        cartItem.forEach((item) => {
          cart.push({ productId: item.productId._id, qty: item.qty, size: item.size })
        })
        localStorage.removeItem("cartItem")
        dispatch(addToCart(cart))
      }
      dispatch(getCartItem())
    }
    else if (!userState.authenticate) {
      dispatch(clearCartState())
      if (cartItem) {
        dispatch({
          type: cartConstant.GET_ITEM_FROM_CART_SUCCESS,
          payload: {
            allCartItem: JSON.parse(localStorage.getItem("cartItem"))
          }
        })
      }
    }
  }, [userState.authenticate])

  return (
    <BrowserRouter>

      <ScrollTop />
      <Switch>

        <Route path="/" exact component={Loader} />

        <Route path="/home" component={HomePage} />

        <Route path="/collections/:categorySlug" exact component={MenAndWomenCategoryPage} />

        <Route path="/collections/:categorySlug/:subCategorySlug" exact component={MenAndWomenCategoryPage} />

        <Route path="/preview/:productId" exact component={Preview} />

        <Route path="/place-order/:productIdAndSize" component={placeOrder}/>

        <Route path="/top-selling" component={TopSelling} />

        <Route path="/newest-products" component={TopSelling} />

        <Route path="/cart" component={Cart} />

        <Route path="/my-account/:page" component={UserProfile} />

        <Route path="/preview/:productId/product-review" component={AllReview} />

        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />

        <Route path="*" component={PageNotFound} />

      </Switch>
    </BrowserRouter>
  );
}

export default App;
