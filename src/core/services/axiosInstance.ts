import { API_KEY, API_URL } from '@env';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const url = new URL(config.url || '', config.baseURL);
    url.searchParams.append('api-key', API_KEY);
    config.url = url.toString();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
