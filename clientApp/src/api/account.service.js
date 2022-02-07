import axiosInstance from "./axiosInstance";

const getCurrentUser = () => {
  return axiosInstance.get("/account");
};

const login = (userLoginData) => {
  return axiosInstance.post("/account/login", userLoginData);
};

const register = (userRegisterData) => {
  return axiosInstance.post("/account/register", userRegisterData);
};

const refreshToken = () => {
  return axiosInstance.post("/account/refreshToken");
};

export const userService = {
  getCurrentUser,
  login,
  register,
  refreshToken,
};
