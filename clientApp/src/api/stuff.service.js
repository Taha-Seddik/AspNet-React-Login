import axiosInstance from "./axiosInstance";

const findSomeData = () => {
  return axiosInstance.get("/WeatherForecast");
};

export const stuffService = {
  findSomeData,
};
