import { API_KEY, API_URL } from '@env';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.params = {
      ...(config.params || {}),
      'api-key': API_KEY,
    };

    const fullUrl = `${config.baseURL}${config.url}`;

    // Build query string
    const queryParams = new URLSearchParams(config.params).toString();
    const finalUrl = queryParams ? `${fullUrl}?${queryParams}` : fullUrl;

    console.log('[Axios Request]', finalUrl);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
