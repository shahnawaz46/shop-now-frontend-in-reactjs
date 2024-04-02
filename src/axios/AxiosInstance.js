import axios from 'axios';
import { apiUrl } from './UlrConfig';

const axiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: 60000,
  withCredentials: true,
});

export default axiosInstance;
