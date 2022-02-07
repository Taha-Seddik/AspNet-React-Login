import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000/api";

const getCurrentUser = () => {
  return axios.get("/account");
};

const login = (userLoginData) => {
  return axios.post("/account/login", userLoginData);
};

const register = (userRegisterData) => {
  return axios.post("/account/register", userRegisterData);
};

const refreshToken = () => {
  return axios.post("/account/refreshToken");
};

export const userService = {
  getCurrentUser,
  login,
  register,
  refreshToken,
};
