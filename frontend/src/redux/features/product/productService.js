import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/products/`;

// ! Create Product
const createProduct = async (formData) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
};
// ! Get Products
const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const productService = {
  createProduct,
  getProducts,
};

export default productService;
