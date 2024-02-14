// TODO - "rxslice" to create the redux slice
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import { toast } from "react-toastify";

const initialState = {
  isLoggedIn: false,
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// * Register user in Auth Slice
export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      return await authService.register(userData);
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

// !
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // * function to reset my auth to the default
    RESET_AUTH(state) {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  // ! to receive response from the database
  extraReducers: (builder) => {
    builder

      // * Register user -- when it is pending
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      // * Register user -- when it is achieved
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
        toast.success("Registration successful");
      })
      // * Register user -- when it is failed
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        toast.success("Registration was not successful");
      });
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
