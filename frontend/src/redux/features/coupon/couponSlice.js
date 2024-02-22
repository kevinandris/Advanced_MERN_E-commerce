import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import couponService from "./couponService";
import { toast } from "react-toastify";

const initialState = {
  coupon: null,
  coupons: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

/* ============== COUPON ================ */
// ! Create a COUPON (1)
export const createCoupon = createAsyncThunk(
  "coupons/createCoupon",
  async (formData, thunkAPI) => {
    try {
      return await couponService.createCoupon(formData);
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

// ! GET COUPONS (2)
export const getCoupons = createAsyncThunk(
  "coupons/getCoupons",
  async (_, thunkAPI) => {
    try {
      return await couponService.getCoupons();
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

// ! GET A COUPON (3)
export const getCoupon = createAsyncThunk(
  "coupons/getCoupon",
  async (couponName, thunkAPI) => {
    try {
      return await couponService.getCoupon(couponName);
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

// ! DELETE A COUPON (3)
export const deleteCoupon = createAsyncThunk(
  "coupons/deleteCoupon",
  async (id, thunkAPI) => {
    try {
      return await couponService.deleteCoupon(id);
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

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // ! Create a Coupon (1)
      // * when it is PENDING
      .addCase(createCoupon.pending, (state) => {
        state.isLoading = true;
      })

      // * when it is ACHIEVED
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Coupon created successfully.");
        console.log(action.payload);
      })

      // * when it is FAILED
      .addCase(createCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.success(action.payload);
      })

      // ! Get coupons (2)
      // * when it is pending
      .addCase(getCoupons.pending, (state) => {
        state.isLoading = true;
      })

      // * when it is achieved
      .addCase(getCoupons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.coupons = action.payload;
        console.log(action.payload);
      })

      // * when it is failed
      .addCase(getCoupons.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // ! Get a coupon (3)
      // * when it is PENDING
      .addCase(getCoupon.pending, (state) => {
        state.isLoading = true;
      })

      // * when it is ACHIEVED
      .addCase(getCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.coupon = action.payload;
        toast.success("The coupon has been applied.");
        console.log(action.payload);
      })

      // * when it is FAILED
      .addCase(getCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // ! Delete a coupon (4)
      // * when it is PENDING
      .addCase(deleteCoupon.pending, (state) => {
        state.isLoading = true;
      })

      // * when it is ACHIEVED
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success(action.payload);
        console.log(action.payload);
      })

      // * when it is FAILED
      .addCase(deleteCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const {} = couponSlice.actions;

export default couponSlice.reducer;
