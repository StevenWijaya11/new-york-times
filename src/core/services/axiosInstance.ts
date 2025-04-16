import { API_KEY, API_URL } from '@env';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.params = {
      'api-key': API_KEY,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
