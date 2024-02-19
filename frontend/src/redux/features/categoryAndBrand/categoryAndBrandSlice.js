// ! "rxslice" to create the form
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoryAndBrandService from "./categoryAndBrandService";
import { toast } from "react-toastify";

const initialState = {
  categories: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const categoryAndBrandSlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    RESET_CAT(state) {
      // * function to reset my auth to the default
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder

      // ! 1
      // * create Category -- when it is pending
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
      })

      // * create Category -- when it is achieved
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Category created successfully.");
        console.log(action.payload);
      })

      // * create Category -- when it is failed
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.success(action.payload);
      })

      // ================================ //

      // ! 2
      // * GET categories -- when it is pending
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
      })

      // * GET categories -- when it is achieved
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.categories = action.payload;
        console.log(action.payload);
      })

      // * GET categories-- when it is failed
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.success(action.payload);
      });

    // ================================= //
  },
});

// ! Create a category (1)
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

// ! Get categories (2)
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

export const { RESET_CAT } = categoryAndBrandSlice.actions;

export default categoryAndBrandSlice.reducer;
