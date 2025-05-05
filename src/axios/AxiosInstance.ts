import axios from 'axios';
import { apiUrl } from './UlrConfig';

const axiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: 120000,
  withCredentials: true,
});

export default axiosInstance;
