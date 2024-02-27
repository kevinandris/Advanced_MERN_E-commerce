// ! Rxslice
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderService from "./orderService";
import { toast } from "react-toastify";

const initialState = {
  order: null,
  orders: [],
  totalOrderAmount: 0,
  /* ========= */
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* =========== EXTRA REDUCERS ============ */
      // ! Create an order (1)
      // * when it is PENDING
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })

      // * when it is ACHIEVED
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.orders = action.payload;
        toast.success(action.payload);
      })

      // * when it is FAILED
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.success(action.payload);
      })

      // ! get all orders (2)
      // * when it is PENDING
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })

      // * when it is ACHIEVED
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.orders = action.payload;
        console.log(action.payload);
      })

      // * when it is FAILED
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // ! get a single order (3)
      // * when it is PENDING
      .addCase(getOrder.pending, (state) => {
        state.isLoading = true;
      })

      // * when it is ACHIEVED
      .addCase(getOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.order = action.payload;
        // console.log(action.payload);
      })

      // * when it is FAILED
      .addCase(getOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // ! Update order status (4)
      // * when it is PENDING
      .addCase(updateOrderStatus.pending, (state) => {
        state.isLoading = true;
      })

      // * when it is ACHIEVED
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success(action.payload);
        console.log(action.payload);
      })

      // * when it is FAILED
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

/* ============== ORDER ================ */
// ! Create an order (1)
export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (formData, thunkAPI) => {
    try {
      return await orderService.createOrder(formData);
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

// ! Get orders (2)
export const getOrders = createAsyncThunk(
  "orders/getOrders",
  async (_, thunkAPI) => {
    try {
      return await orderService.getOrders();
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

// ! Get a single order (3)
export const getOrder = createAsyncThunk(
  "orders/getOrder",
  async (id, thunkAPI) => {
    try {
      return await orderService.getOrder(id);
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

// ! Update order status (4)
export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await orderService.updateOrderStatus(id, formData);
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

export const {} = orderSlice.actions;

const selectOrders = (state) => state.order.orders;
const selectTotalOrderAmount = (state) => state.order.totalOrderAmount;

export default orderSlice.reducer;
