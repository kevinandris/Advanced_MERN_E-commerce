// ! Rxslice
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getCartQuantityById } from "../../../utils";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  fixedCartTotalAmount: 0,

  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART(state, action) {
      const cartQuantity = getCartQuantityById(
        state.cartItems,
        action.payload._id
      );

      const productIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (productIndex >= 0) {
        /* >> Preventing a user adding more than the product's quantity to the cart */
        if (cartQuantity === action.payload.quantity) {
          state.cartItems[productIndex].cartQuantity += 0;
          toast.info("Max number of product reached!!!");
        } else {
          /* >> Item already exists in the cart, increase the cartQuantity by 1*/
          state.cartItems[productIndex].cartQuantity += 1;
          toast.info(`${action.payload.name} increased by one`, {
            position: "top-left",
          });
        }
      } else {
        /* >> Item doesn't exists in the cart, then `add item to the cart `*/
        const temporaryProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(temporaryProduct);
        toast.success(`${action.payload.name} added to cart`, {
          position: "top-left",
        });
      }

      /* >> Save the item to the local-storage - Local storage helps keeping the items SAVED to something 
          (in the cart for example), although the user is logged out or the browser is closed.
       */
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

export const { ADD_TO_CART } = cartSlice.actions;

export default cartSlice.reducer;
