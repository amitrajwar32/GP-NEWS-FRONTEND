import axios from 'axios';
import { API_URL } from '../config/env.js';

// Use centralized API URL from env
console.debug('AXIOS baseURL:', API_URL);
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Attach JWT from localStorage if present
const attachAuthHeader = () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

attachAuthHeader();

axiosInstance.interceptors.request.use(
  (config) => {
    // ensure header is present for each request
    const token = localStorage.getItem('authToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    // auto logout on 401
    if (status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      attachAuthHeader();
      if (typeof window !== 'undefined' && window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login';
      }
    }

    // normalize error
    const message = error?.response?.data?.message || error.message || 'Network error';
    return Promise.reject({ status, message, original: error });
  }
);

export default axiosInstance;
