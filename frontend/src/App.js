import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoginStatus, getUser } from "./redux/features/auth/authSlice";
import Profile from "./pages/profile/Profile";
import Admin from "./pages/admin/Admin";
import AdminOnlyRoute from "./components/hiddenLink/AdminOnlyRoute";
import NotFound from "./pages/404/NotFound";
import Product from "./pages/shop/Product";
import ProductDetails from "./components/product/productDetails/ProductDetails";
import Cart from "./pages/cart/Cart";
import CheckoutDetails from "./pages/checkout/CheckoutDetails";
import CheckoutStripe from "./pages/checkout/CheckoutStripe";
import CheckoutSuccess from "./pages/checkout/CheckoutSuccess";
import OrderHistory from "./pages/order/OrderHistory";
import OrderDetails from "./pages/order/OrderDetails";
import CheckoutFlutterwave from "./pages/checkout/CheckoutFlutterwave";
import CheckoutPaypal from "./pages/checkout/CheckoutPaypal";
import Wallet from "./pages/wallet/Wallet";
import CheckoutWallet from "./pages/checkout/CheckoutWallet";
import Wishlist from "./pages/wishlist/Wishlist";
import ReviewProduct from "./pages/reviewProduct/ReviewProduct";

function App() {
  /* >>> ! using axios every time we send the token or credentials to the backend through "http request". */
  axios.defaults.withCredentials = true;
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  /* >>> To check if the user is logged in - so the "My Order and Logout NavLinks" are static 
      instead of showing "Login and Register NavLinks" after logging in when the "page is refreshed". */
  useEffect(() => {
    dispatch(getLoginStatus());
  }, [dispatch]);

  /* >>> ( FOR ADMIN ) to keep the Admin name of the navbar and on the header every time the page refreshed. */
  useEffect(() => {
    if (isLoggedIn && user === null) {
      dispatch(getUser());
    }
  }, [dispatch, isLoggedIn, user]);

  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Header /> {/* >>> from components folder */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/shop" element={<Product />} />
          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout-success" element={<CheckoutSuccess />} />
          <Route path="/checkout-details" element={<CheckoutDetails />} />
          <Route path="/checkout-stripe" element={<CheckoutStripe />} />
          <Route
            path="/checkout-flutterwave"
            element={<CheckoutFlutterwave />}
          />
          <Route path="/checkout-paypal" element={<CheckoutPaypal />} />
          <Route path="/checkout-wallet" element={<CheckoutWallet />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/review-product/:id" element={<ReviewProduct />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/order-details/:id" element={<OrderDetails />} />

          {/* >> for admin only route*/}
          <Route
            path="/admin/*"
            element={
              <AdminOnlyRoute>
                <Admin />
              </AdminOnlyRoute>
            }
          />

          {/* >>> Not Found page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
