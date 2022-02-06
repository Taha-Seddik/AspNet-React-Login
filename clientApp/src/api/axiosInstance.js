import axios from "axios";
import store from "../redux-store/store";
import { GetUserAccessToken } from "../redux-store/selectors";

axios.defaults.baseURL = "http://localhost:5000/api";

const getAccessToken = () => {
  return GetUserAccessToken(store.getState());
};

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    const auth = token ? `Bearer ${token}` : "";
    config.headers.common["Authorization"] = auth;
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
