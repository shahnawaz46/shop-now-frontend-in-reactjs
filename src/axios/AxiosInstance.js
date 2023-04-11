import axios from 'axios'
import { apiUrl } from './UlrConfig';

const axiosInstance = axios.create({
    baseURL: apiUrl,
    timeout: 60000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

export default axiosInstance;