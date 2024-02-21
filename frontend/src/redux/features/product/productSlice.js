// "rxslice" to create the form
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productService from "./productService";
import { toast } from "react-toastify";

const initialState = {
  product: null,
  products: [],
  minPrice: null,
  maxPrice: null,
  totalStoreValue: 0,
  outOfStock: 0,
  category: [],

  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

/* These functions below are shipped into the productSlice */
// ! Create a Product (1)
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (formData, thunkAPI) => {
    try {
      return await productService.createProduct(formData);
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

// ! Get products (2)
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, thunkAPI) => {
    try {
      return await productService.getProducts();
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

// ! Delete a product (3)
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, thunkAPI) => {
    try {
      return await productService.deleteProduct(id);
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

// ! Get a product (4)
export const getProduct = createAsyncThunk(
  "products/getProduct",
  async (id, thunkAPI) => {
    try {
      return await productService.getProduct(id);
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

/* ==============> PRODUCT SLICE <=============== */
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    RESET_PROD(state) {
      // * function to reset my auth to the default
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder

      // ! Create a Product (1)
      // * Create a Product -- when it is pending
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })

      // * Create a Product -- when it is achieved
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        if (action.payload && action.payload.hasOwnProperty("message")) {
          toast.error(action.payload.message);
        } else {
          state.message = "Product created successfully";
          toast.success("Product created successfully.");
        }
      })

      // * Create a Product -- when it is failed
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // ! Get products (2)
      // * Get products -- when it is pending
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })

      // * Get Products -- when it is achieved
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.products = action.payload;
        console.log(action.payload);
      })

      // * Get Products -- when it is failed
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // ! Delete a product (3)
      // * Delete a product -- when it is pending
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })

      // * Delete a product -- when it is achieved
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Product deleted successfully");
      })

      // * Delete a product -- when it is failed
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // ! Get a product (4)
      // * Delete a product -- when it is pending
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true;
      })

      // * Delete a product -- when it is achieved
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.products = action.payload;
      })

      // * Delete a product -- when it is failed
      .addCase(getProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { RESET_PROD } = productSlice.actions;

export default productSlice.reducer;
