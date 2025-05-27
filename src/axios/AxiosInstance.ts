import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 120000,
  withCredentials: true,
});

export default axiosInstance;
