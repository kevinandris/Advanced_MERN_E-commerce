// ! Rxslice
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getCartQuantityById } from "../../../utils";
import cartService from "./cartService";

const FRONTEND_URL = process.env.REACT_APP_FRONTEND_URL;

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

// ! Save Cart (1)
export const saveCartDB = createAsyncThunk(
  "cart/saveCartDB",
  async (cartData, thunkAPI) => {
    try {
      return await cartService.saveCartDB(cartData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ! Get the Cart (2)
export const getCartDB = createAsyncThunk(
  "cart/getCartDB",
  async (_, thunkAPI) => {
    try {
      return await cartService.getCartDB();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // ! 1
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
          toast.info(`${action.payload.name} is ncreased by one`, {
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

    // ! 2
    DECREASE_CART(state, action) {
      const productIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (state.cartItems[productIndex].cartQuantity > 1) {
        /* >> Decrease the cart */
        state.cartItems[productIndex].cartQuantity -= 1;
        toast.info(`${action.payload.name} is decreased by one`, {
          position: "top-left",
        });
      } else if (state.cartItems[productIndex].cartQuantity === 1) {
        const newCartItem = state.cartItems.filter(
          (item) => item._id !== action.payload._id
        );
        state.cartItems = newCartItem;
        toast.success(`${action.payload.name} is removed from cart`, {
          position: "top-left",
        });
      }

      /* >> Save the item to the local-storage - Local storage helps keeping the items SAVED to something 
          (in the cart for example), although the user is logged out or the browser is closed.
       */
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    // ! 3
    /* >> Only for a single item */
    REMOVE_FROM_CART(state, action) {
      const newCartItem = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      state.cartItems = newCartItem;
      toast.success(`${action.payload.name} removed from cart`, {
        position: "top-left",
      });

      // >> Save to local storage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    // ! 4
    /* >> DELETE ALL ITEM in the cart */
    CLEAR_CART(state, action) {
      state.cartItems = [];
      toast.success(`Your cart has been cleared.`, {
        position: "top-left",
      });

      // >> Save to local storage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    // ! 5
    /* >> Calculate total quantity */
    CALCULATE_TOTAL_QUANTITY(state, action) {
      const array = [];
      state.cartItems?.map((item) => {
        const { cartQuantity } = item;
        const quantity = cartQuantity;

        return array.push(quantity);
      });

      const totalQuantity = array.reduce((a, b) => {
        return a + b;
      }, 0);

      state.cartTotalQuantity = totalQuantity;
    },

    // ! 6
    CALCULATE_SUB_TOTAL(state, action) {
      const array = [];
      state.cartItems?.map((item) => {
        const { price, cartQuantity } = item;
        const cartItemAmount = price * cartQuantity;

        return array.push(cartItemAmount);
      });

      const totalAmount = array.reduce((a, b) => {
        return a + b;
      });

      state.cartTotalAmount = totalAmount;
    },
  },

  extraReducers: (builder) => {
    builder

      // =========== CART BUILDER ============ //

      // ! Save a Cart (1)
      // *  when it is PENDING
      .addCase(saveCartDB.pending, (state) => {
        state.isLoading = true;
      })

      // *  when it is ACHIEVED
      .addCase(saveCartDB.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
      })

      // *  when it is FAILED
      .addCase(saveCartDB.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        console.log(action.payload);
      })

      // ! Get the CART from Database (2)
      // *  when it is PENDING
      .addCase(getCartDB.pending, (state) => {
        state.isLoading = true;
      })

      // *  when it is ACHIEVED
      .addCase(getCartDB.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        /* >> save the cart from the DB to local storage */
        localStorage.setItem("cartItems", JSON.stringify(action.payload));

        /* >> if there is at least 1 item in the cart item */
        if (action.payload.length > 0) {
          window.location.href = FRONTEND_URL + "/cart";
        } else {
          window.location.href = FRONTEND_URL;
        }

        console.log(action.payload);
      })

      // *  when it is FAILED
      .addCase(getCartDB.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        console.log(action.payload);
      });
  },
});

export const {
  ADD_TO_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  CALCULATE_TOTAL_QUANTITY,
  CALCULATE_SUB_TOTAL,
} = cartSlice.actions;
export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount;

export default cartSlice.reducer;
