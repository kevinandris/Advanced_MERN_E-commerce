// ! Rxslice
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paymentMethod: localStorage.getItem("paymentMethod")
    ? JSON.parse(localStorage.getItem("paymentMethod"))
    : "",
  shippingAddress: localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : "",
  billingAddress: localStorage.getItem("billingAddress")
    ? JSON.parse(localStorage.getItem("billingAddress"))
    : "",
};

/* ========= checkout slice =========== */
const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    SAVE_PAYMENT_METHOD(state, action) {
      state.paymentMethod = action.payload;
      localStorage.setItem(
        "paymentMethod",
        JSON.stringify(state.paymentMethod)
      );
    },

    SAVE_SHIPPING_ADDRESS(state, action) {
      state.shippingAddress = action.payload;
      localStorage.setItem(
        "shippingAddress",
        JSON.stringify(state.shippingAddress)
      );
    },

    SAVE_BILLING_ADDRESS(state, action) {
      state.billingAddress = action.payload;
      localStorage.setItem(
        "billingAddress",
        JSON.stringify(state.billingAddress)
      );
    },
  },
});

export const {
  SAVE_PAYMENT_METHOD,
  SAVE_SHIPPING_ADDRESS,
  SAVE_BILLING_ADDRESS,
} = checkoutSlice.actions;

export const selectPaymentMethod = (state) => state.checkout.paymentMethod;
export const selectShippingAddress = (state) => state.checkout.shippingAddress;
export const selectBillingAddress = (state) => state.checkout.billingAddress;

export default checkoutSlice.reducer;
