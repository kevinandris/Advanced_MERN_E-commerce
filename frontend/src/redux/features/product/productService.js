import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/products/`;

// ! Create Product (1)
const createProduct = async (formData) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
};
// ! Get Products  (2)
const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// ! Delete a product (3)
const deleteProduct = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};

// ! Get a product (4)
const getProduct = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};

// ! Update a product (5)
const updateProduct = async (id, formData) => {
  const response = await axios.patch(API_URL + id, formData);
  return response.data;
};

const productService = {
  createProduct,
  getProducts,
  deleteProduct,
  getProduct,
  updateProduct,
};

export default productService;
