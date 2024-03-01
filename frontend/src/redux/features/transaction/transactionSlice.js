import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import transactionService from "./transactionService";
import { toast } from "react-toastify";

const initialState = {
  transaction: null,
  transactions: [],
  receiverName: "",

  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    RESET_TRANSACTION_MESSAGE(state) {
      state.message = "";
    },
    RESET_RECEIVER(state) {
      state.receiverName = "";
    },
  },
  extraReducers: (builder) => {
    builder
      /*  =========== BUILDER =================*/
      // ! Get user transactions (1)
      // * when it is pending
      .addCase(getUserTransactions.pending, (state) => {
        state.isLoading = true;
      })

      // * when it is achieved
      .addCase(getUserTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.transactions = action.payload;
        console.log(action.payload);
      })

      // * when it is failed
      .addCase(getUserTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // ! Verify an account (2)
      // * when it is pending
      .addCase(verifyAccount.pending, (state) => {
        state.isLoading = true;
      })

      // * when it is achieved
      .addCase(verifyAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.receiverName = action.payload.receiverName;
        state.message = action.payload.message;
        toast.success(action.payload.message);
        console.log(action.payload);
      })

      // * when it is failed
      .addCase(verifyAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // ! Transfer fund (3)
      // * when it is pending
      .addCase(transferFund.pending, (state) => {
        state.isLoading = true;
      })

      // * when it is achieved
      .addCase(transferFund.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload;
        toast.success(action.payload);
        console.log(action.payload);
      })

      // * when it is failed
      .addCase(transferFund.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

/* ============ TRANSACTIONS =========== */

// ! Get user transactions (1)
export const getUserTransactions = createAsyncThunk(
  "transactions/getUserTransactions",
  async (_, thunkAPI) => {
    try {
      return await transactionService.getUserTransactions();
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

// ! Verify account(2)
export const verifyAccount = createAsyncThunk(
  "transactions/verifyAccount",
  async (formData, thunkAPI) => {
    try {
      return await transactionService.verifyAccount(formData);
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

// ! Transfer fund (3)
export const transferFund = createAsyncThunk(
  "transactions/transferFund",
  async (formData, thunkAPI) => {
    try {
      return await transactionService.transferFund(formData);
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

export const { RESET_TRANSACTION_MESSAGE, RESET_RECEIVER } =
  transactionSlice.actions;

export const selectTransactions = (state) => state.transaction.transactions;
export const selectTransactionMessage = (state) => state.transaction.message;
export const selectReceiverName = (state) => state.transaction.receiverName;

export default transactionSlice.reducer;
