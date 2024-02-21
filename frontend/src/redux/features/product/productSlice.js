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

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
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
        state.products = action.payload;
        toast.success("Product created successfully");
        console.log(action.payload);
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

      // * Create a Product -- when it is achieved
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.products = action.payload;
        console.log(action.payload);
      })

      // * Create a Product -- when it is failed
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const {} = productSlice.actions;

export default productSlice.reducer;
