import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/order/`;

// ! Create an ORDER (1)
const createOrder = async (formData) => {
  const response = await axios.post(API_URL, formData);
  return response.data.message;
};

// ! Get all orders (2)
const getOrders = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// ! Get a single order(3)
const getOrder = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};

// ! Update Order Status (4)
const updateOrderStatus = async (id, formData) => {
  const response = await axios.patch(
    `${API_URL}${id}`,
    formData
  ); /* >> Can't have a blank space between ${API_URL}${id} otherwise an error occurs*/
  return response.data.message;
};

const orderService = {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
};

export default orderService;
