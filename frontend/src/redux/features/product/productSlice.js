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

// ! Update a product (5)
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await productService.updateProduct(id, formData);
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

// ! Review a product (6)
export const reviewProduct = createAsyncThunk(
  "products/reviewProduct",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await productService.reviewProduct(id, formData);
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

// ! Delete a review (7)
export const deleteReview = createAsyncThunk(
  "products/deleteReview",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await productService.deleteReview(id, formData);
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

// ! Update a review (8)
export const updateReview = createAsyncThunk(
  "products/updateReview",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await productService.updateReview(id, formData);
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
    /* // * function to reset my auth to the default */
    RESET_PROD(state) {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },

    /* >>> Get price range function */
    GET_PRICE_RANGE(state, action) {
      const { products } = action.payload;
      const array = [];
      products.map((product) => {
        const price = product.price;
        return array.push(price);
      });

      const min = Math.min(...array);
      const max = Math.max(...array);

      state.minPrice = min;
      state.maxPrice = max;
    },
  },
  extraReducers: (builder) => {
    builder

      // ! Create a Product (1)
      // *  when it is pending
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })

      // * when it is achieved
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

      // * when it is failed
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // ! Get products (2)
      // * when it is pending
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })

      // * when it is achieved
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.products = action.payload;
        // console.log(action.payload);
      })

      // * when it is failed
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // ! Delete a product (3)
      // * when it is pending
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })

      // * when it is achieved
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Product deleted successfully");
      })

      // * when it is failed
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // ! Get a product (4)
      // * when it is pending
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true;
      })

      // * when it is achieved
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.product = action.payload;
        console.log(action.payload);
      })

      // * when it is failed
      .addCase(getProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // ! Update a product (5)
      // * when it is pending
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })

      // * when it is achieved
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        if (action.payload && action.payload.hasOwnProperty("message")) {
          toast.error(action.payload.message);
        } else {
          state.message = "Product updated successfully";
          toast.success("Product updated successfully");
        }
      })

      // * when it is failed
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // ! Review a product (6)
      // * when it is pending
      .addCase(reviewProduct.pending, (state) => {
        state.isLoading = true;
      })

      // * when it is achieved
      .addCase(reviewProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success(action.payload);
      })

      // * when it is failed
      .addCase(reviewProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // ! Delete a review (7)
      // * when it is pending
      .addCase(deleteReview.pending, (state) => {
        state.isLoading = true;
      })

      // * when it is achieved
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success(action.payload);
      })

      // * when it is failed
      .addCase(deleteReview.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // ! Update a review (8)
      // * when it is pending
      .addCase(updateReview.pending, (state) => {
        state.isLoading = true;
      })

      // * when it is achieved
      .addCase(updateReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success(action.payload);
      })

      // * when it is failed
      .addCase(updateReview.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { RESET_PROD, GET_PRICE_RANGE } = productSlice.actions;
export const selectProduct = (state) => state.product.product;
export const selectIsLoading = (state) => state.product.isLoading;

export default productSlice.reducer;
