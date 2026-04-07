import axios from "axios";
import { getToken, setToken } from "../services/tokenService";
import { clearStateAndStorage } from "../utils/ClearStateAndStorage";

const baseURL = import.meta.env.VITE_BASE_URL;

const getRefreshToken = async () => {
  try {
    // using plain axios call (not axiosInstance) to avoid interceptor loops
    const res = await axios.get(`${baseURL}/refresh`, {
      withCredentials: true,
    });

    const newAccessToken = res.data._a_t;
    setToken(newAccessToken);

    return newAccessToken;
  } catch (error) {
    throw error;
  }
};

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 120000,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    // if error is 401 or 403 and we haven't retried yet
    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // request new access and refresh token using refresh token
        const newAccessToken = await getRefreshToken();

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        clearStateAndStorage();
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
