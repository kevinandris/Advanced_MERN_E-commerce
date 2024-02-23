import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import categoryReducer from "../redux/features/categoryAndBrand/categoryAndBrandSlice";
import productReducer from "../redux/features/product/productSlice";
import couponReducer from "../redux/features/coupon/couponSlice";
import filterReducer from "../redux/features/product/filterSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    product: productReducer,
    coupon: couponReducer,
    filter: filterReducer,
  },
});
