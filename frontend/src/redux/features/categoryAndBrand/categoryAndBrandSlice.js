// ! "rxslice" to create the form
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoryAndBrandService from "./categoryAndBrandService";
import { toast } from "react-toastify";

const initialState = {
  categories: [],
  brands: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const categoryAndBrandSlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    RESET_CATEGORY(state) {
      // * function to reset my auth to the default
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder

      // =========== CATEGORY ============ //

      // ! Create a Category (1)
      // *  when it is PENDING
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
      })

      // *  when it is ACHIEVED
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Category created successfully.");
        console.log(action.payload);
      })

      // *  when it is FAILED
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.success(action.payload);
      })

      // ! Get categories (2)
      // *  when it is PENDING
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
      })

      // *  when it is ACHIEVED
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.categories = action.payload;
        // console.log(action.payload);
      })

      // * when it is FAILED
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // ! Delete a category (3)
      // *  when it is PENDING
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
      })

      // *  when it is ACHIEVED
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success(action.payload);
        console.log(action.payload);
      })

      // * when it is FAILED
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.success(action.payload);
      })

      // ============= BRAND ============== //

      // ! Create a brand (4)
      // *  when it is PENDING
      .addCase(createBrand.pending, (state) => {
        state.isLoading = true;
      })

      // *  when it is ACHIEVED
      .addCase(createBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Brand created successfully.");
        console.log(action.payload);
      })

      // *  when it is FAILED
      .addCase(createBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // ! Get brands (5)
      // *  when it is PENDING
      .addCase(getBrands.pending, (state) => {
        state.isLoading = true;
      })

      // *  when it is ACHIEVED
      .addCase(getBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.brands = action.payload;
        // console.log(action.payload);
      })

      // *  when it is FAILED
      .addCase(getBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // ! Delete a brand (6)
      // *  when it is PENDING
      .addCase(deleteBrand.pending, (state) => {
        state.isLoading = true;
      })

      // *  when it is ACHIEVED
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.brands = action.payload;
        console.log(action.payload);
      })

      // *  when it is FAILED
      .addCase(deleteBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

/* ============== CATEGORY ================ */
// ! Create a CATEGORY (1)
export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (formData, thunkAPI) => {
    try {
      return await categoryAndBrandService.createCategory(formData);
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

// ! Get CATEGORIES (2)
export const getCategories = createAsyncThunk(
  "category/getCategories",
  async (_, thunkAPI) => {
    try {
      return await categoryAndBrandService.getCategories();
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

// ! Delete a CATEGORY (3)
export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (slug, thunkAPI) => {
    try {
      return await categoryAndBrandService.deleteCategory(slug);
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

/* ================= BRAND ================== */
// ! Create a BRAND (4)
export const createBrand = createAsyncThunk(
  "category/createBrand",
  async (formData, thunkAPI) => {
    try {
      return await categoryAndBrandService.createBrand(formData);
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

// ! Get BRANDS (5)
export const getBrands = createAsyncThunk(
  "category/getBrands",
  async (_, thunkAPI) => {
    try {
      return await categoryAndBrandService.getBrands();
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

// ! Delete a BRAND (6)
export const deleteBrand = createAsyncThunk(
  "category/deleteBrand",
  async (slug, thunkAPI) => {
    try {
      return await categoryAndBrandService.deleteBrand(slug);
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

export const { RESET_CATEGORY } = categoryAndBrandSlice.actions;

export default categoryAndBrandSlice.reducer;
