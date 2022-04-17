import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use();
axiosClient.interceptors.response.use();

export default axiosClient;
