// ! Rxslice
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

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
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (productIndex >= 0) {
        /* >> Item already exists in the cart, increase the cartQuantity */
        state.cartItems[productIndex].cartQuantity += 1;
        toast.success(`${action.payload.name} is increased by one`, {
          position: "top-left",
        });
      } else {
        /* >> Item doesn't exists in the cart, then `add item to the cart `*/
        const temporaryProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(temporaryProduct);
        toast.success(`${action.payload.name} added to the cart`, {
          position: "top-left",
        });
      }

      /* >> Save the item to the local-storage - Local storage helps keeping the items SAVED to something 
          (in the cart for example), although the user is logged out or the browser is closed.
       */
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
  extraReducers: (builder) => {},
});

export const { ADD_TO_CART } = cartSlice.actions;

export default cartSlice.reducer;
