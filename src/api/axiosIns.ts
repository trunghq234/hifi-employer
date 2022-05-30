import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.VITE_SERVER_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use();
axiosInstance.interceptors.response.use();

export default axiosInstance;
