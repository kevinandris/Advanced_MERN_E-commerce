import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/transaction/`;

// ! Get user transactions (1)
const getUserTransactions = async () => {
  const response = await axios.get(API_URL + "getUserTransactions");
  return response.data;
};

// ! Verify account (2)
const verifyAccount = async (formData) => {
  const response = await axios.post(API_URL + "verifyAccount", formData);
  return response.data;
};

// ! Transfer Fund (3)
const transferFund = async (formData) => {
  const response = await axios.post(API_URL + "transferFund", formData);
  return response.data.message;
};

const transactionService = {
  getUserTransactions,
  verifyAccount,
  transferFund,
};

export default transactionService;
