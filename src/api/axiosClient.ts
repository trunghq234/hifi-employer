import { AppVariables } from "@/config";
import axios, { AxiosRequestConfig } from "axios";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || AppVariables.apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use();
axiosClient.interceptors.response.use();

export default axiosClient;
