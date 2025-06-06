import axios from 'axios';
import { showGlobalLoader, hideGlobalLoader } from './loaderControl';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
});

// Request interceptor — show loader
axiosInstance.interceptors.request.use(
  (config) => {
    showGlobalLoader(); // 👈 trigger global loading
    return config;
  },
  (error) => {
    hideGlobalLoader(); // ensure cleanup on error
    return Promise.reject(error);
  }
);

// Response interceptor — hide loader
axiosInstance.interceptors.response.use(
  (response) => {
    hideGlobalLoader();
    return response;
  },
  (error) => {
    hideGlobalLoader();
    return Promise.reject(error);
  }
);

export default axiosInstance;
