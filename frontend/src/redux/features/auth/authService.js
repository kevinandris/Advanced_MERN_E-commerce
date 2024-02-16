import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/users/`;

// ! Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData, {
    withCredentials: true,
  });
  return response.data;
};

// ! login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);
  return response.data;
};

// ! logout user
const logout = async () => {
  const response = await axios.get(API_URL + "logout");
  return response.data.message;
};

// ! get login status from the user
const getLoginStatus = async () => {
  const response = await axios.get(API_URL + "getLoginStatus");
  return response.data;
};

// ! get user
const getUser = async () => {
  const response = await axios.get(API_URL + "getUser");
  return response.data;
};

// ! update user
const updateUser = async (userData) => {
  const response = await axios.patch(API_URL + "updateUser", userData);
  return response.data;
};

// ! update photo
const updatePhoto = async (userData) => {
  const response = await axios.patch(API_URL + "updatePhoto", userData);
  return response.data;
};

const authService = {
  register,
  login,
  logout,
  getLoginStatus,
  getUser,
  updateUser,
  updatePhoto,
};

export default authService;
