import axios from "axios";
import axiosInstance from "./axiosInstance";

axios.defaults.baseURL = "http://localhost:3000/api";

const getCurrentUser = () => {
  return axios.get("/account");
};

const login = (userLoginData) => {
  return axiosInstance.post("/account/login", userLoginData);
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
