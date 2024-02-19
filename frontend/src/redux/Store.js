import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import categoryReducer from "../redux/features/categoryAndBrand/categoryAndBrandSlice";
import productReducer from "../redux/features/product/productSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    product: productReducer,
  },
});
