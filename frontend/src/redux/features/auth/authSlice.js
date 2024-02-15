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

// * (1) REGISTER user in Auth Slice
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

// * (2) LOGIN user in Auth Slice
export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
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

// * (3) LOGOUT user in Auth Slice
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    return await authService.logout();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// * (4) GET LOGIN STATUS of a user in Auth Slice
export const getLoginStatus = createAsyncThunk(
  "auth/getLoginStatus",
  async (_, thunkAPI) => {
    try {
      return await authService.getLoginStatus();
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
    RESET_AUTH(state) {
      // * function to reset my auth to the default
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  // ! to receive response from the database
  extraReducers: (builder) => {
    builder

      // * REGISTER user -- when it is pending
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })

      // * REGISTER user -- when it is achieved
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
        toast.success("Registration successful");
      })

      // * REGISTER user -- when it is failed
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        toast.success("Registration was not successful");
      })

      /* =========> END OF REGISTER ========= */

      // * LOGIN user -- when it is pending
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })

      // * LOGIN user -- when it is achieved
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
        toast.success("Login successful");

        /* to check the stored data from the database */
        // console.log(action.payload);
      })

      // * LOGIN user -- when it is failed
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        toast.success(action.payload);
      })

      /* ==========> END OF LOGIN <========== */

      // * LOGOUT user -- when it is pending
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })

      // * LOGOUT user -- when it is achieved
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = false;
        state.user = null;
        toast.success(action.payload);

        /* to check the stored data from the database */
        // console.log(action.payload);
      })

      // * LOGOUT user -- when it is failed
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.success(action.payload);
      })

      /* =========> END OF LOGOUT <========== */

      // * GET LOGIN STATUS of a user -- when it is pending
      .addCase(getLoginStatus.pending, (state) => {
        state.isLoading = true;
      })

      // * GET LOGIN STATUS of a user -- when it is achieved
      .addCase(getLoginStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = action.payload;

        /* to check the stored data from the database */
        // console.log(action.payload);

        if (action.payload.message === "invalid signature") {
          state.isLoggedIn = false;
        }
      })

      // * GET LOGIN STATUS of a user  -- when it is failed
      .addCase(getLoginStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });

    /* =======> END OF GET LOGIN STATUS <======== */
  },
});

export const { RESET_AUTH } = authSlice.actions;

export default authSlice.reducer;
