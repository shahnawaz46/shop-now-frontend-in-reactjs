import axios from 'axios'
import { apiUrl } from './UlrConfig';

const Axios = axios.create({
    baseURL: apiUrl,
    withCredentials: true
})

export default Axios;