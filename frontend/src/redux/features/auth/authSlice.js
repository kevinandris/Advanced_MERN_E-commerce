// TODO - "rxslice" to create the redux slice
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import { toast } from "react-toastify";
// import toast, { Toaster } from "react-hot-toast";

const initialState = {
  isLoggedIn: false,
  user: null,
  wishlist: [],
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

// * (5) GET USER  in Auth Slice
export const getUser = createAsyncThunk("auth/getUser", async (_, thunkAPI) => {
  try {
    return await authService.getUser();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// * (6) UPDATE USER  in Auth Slice
export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (userData, thunkAPI) => {
    try {
      return await authService.updateUser(userData);
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

// * (7) UPDATE PHOTO in Auth Slice
export const updatePhoto = createAsyncThunk(
  "auth/updatePhoto",
  async (userData, thunkAPI) => {
    try {
      return await authService.updatePhoto(userData);
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

// ! Add to Wishlist (8)
export const addToWishlist = createAsyncThunk(
  "auth/addToWishlist",
  async (productData, thunkAPI) => {
    try {
      return await authService.addToWishlist(productData);
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

// ! Get Wishlist (9)
export const getWishlist = createAsyncThunk(
  "auth/getWishlist",
  async (_, thunkAPI) => {
    try {
      return await authService.getWishlist();
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

// ! Remove from Wishlist (10)
export const removeFromWishlist = createAsyncThunk(
  "auth/removeFromWishlist",
  async (productId, thunkAPI) => {
    try {
      return await authService.removeFromWishlist(productId);
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

// =================== AUTH SLICE =================== //
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
  // ! To receive response from the database
  extraReducers: (builder) => {
    builder

      // ! 1
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
        toast.error("Registration was not successful");
      })

      /* =========> END OF REGISTER ========= */

      // ! 2
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

      // ! 3
      // * LOGIN user -- when it is failed
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        toast.error(action.payload);
      })

      /* ==========> END OF LOGIN <========== */

      // ! 4
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

      // ! 5
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
      })

      /* =======> END OF GET LOGIN STATUS <======== */

      // ! 6
      // * GET USER -- when it is pending
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })

      // * GET USER  -- when it is achieved
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload; /* it will send the user data to payload */

        /* to check the stored data from the database */
        // console.log(action.payload);
      })

      // * GET USER   -- when it is failed
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      /* =======> END OF GET USER <======== */

      // ! 7
      // * UPDATE USER -- when it is pending
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })

      // * UPDATE USER  -- when it is achieved
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload; /* it will send the user data to payload */
        toast.success("User Updated");

        /* == to check the stored data from the database. ==*/
        // console.log(action.payload);
      })

      // * UPDATE USER   -- when it is failed
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      /* =======> END OF UPDATE USER <======== */

      // ! 8
      // * UPDATE PHOTO -- when it is pending
      .addCase(updatePhoto.pending, (state) => {
        state.isLoading = true;
      })

      // * UPDATE PHOTO  -- when it is achieved
      .addCase(updatePhoto.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload; /* it will send the user data to payload */
        toast.success("User Photo Updated");

        /* == to check the stored data from the database. ==*/
        // console.log(action.payload);
      })

      // * UPDATE PHOTO   -- when it is failed
      .addCase(updatePhoto.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // ! 9
      // * Add to Wishlist -- when it is pending
      .addCase(addToWishlist.pending, (state) => {
        state.isLoading = true;
      })

      // * Add to Wishlist  -- when it is achieved
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message =
          action.payload; /* it will send the user data to payload */
        toast.success(action.payload);

        /* == to check the stored data from the database. ==*/
        // console.log(action.payload);
      })

      // * Add to Wishlist   -- when it is failed
      .addCase(addToWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // ! 9
      // * Get Wishlist-- when it is pending
      .addCase(getWishlist.pending, (state) => {
        state.isLoading = true;
      })

      // * Get Wishlist -- when it is achieved
      .addCase(getWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.wishlist =
          action.payload.wishlist; /* it will send the user data to payload */

        /* == to check the stored data from the database. ==*/
        // console.log(action.payload);
      })

      // * Get Wishlist  -- when it is failed
      .addCase(getWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // ! 10
      // * Remove from Wishlist-- when it is pending
      .addCase(removeFromWishlist.pending, (state) => {
        state.isLoading = true;
      })

      // * Remove from Wishlist -- when it is achieved
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message =
          action.payload; /* it will send the user data to payload */
        toast.success(action.payload);

        /* == to check the stored data from the database. ==*/
        // console.log(action.payload);
      })

      // * Remove from Wishlist  -- when it is failed
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });

    /* =======> END OF UPDATE PHOTO <======== */
  },
});

export const { RESET_AUTH } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

export default authSlice.reducer;
