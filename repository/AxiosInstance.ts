import { API_KEY, API_URL } from '@env';
import axios, { AxiosError } from 'axios';
import { NetworkError } from '../utils/NetworkError';

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

axiosInstance.interceptors.response.use(
  (response) => response,
  (err) => {
    if (err.code === AxiosError.ERR_NETWORK) {
      return Promise.reject(new AxiosError(NetworkError.ECONNABORTED.message, NetworkError.ECONNABORTED.code));
    } else if (err.response) {
      const { status, data } = err.response;
      switch (status) {
        case 400:
          return Promise.reject(
            new AxiosError(data?.message || NetworkError.BAD_REQUEST.message, NetworkError.BAD_REQUEST.code),
          );
        case 401:
          return Promise.reject(new AxiosError(NetworkError.UNAUTHORIZED.message, NetworkError.UNAUTHORIZED.code));
        case 403:
          return Promise.reject(new AxiosError(NetworkError.FORBIDDEN.message, NetworkError.FORBIDDEN.code));
        case 404:
          return Promise.reject(new AxiosError(NetworkError.NOT_FOUND.message, NetworkError.NOT_FOUND.code));
        case 429:
          return Promise.reject(
            new AxiosError(NetworkError.TOO_MANY_REQUESTS.message, NetworkError.TOO_MANY_REQUESTS.code),
          );
        case 500:
          return Promise.reject(new AxiosError(NetworkError.SERVER_ERROR.message, NetworkError.SERVER_ERROR.code));
        default:
          if (err.code === AxiosError.ECONNABORTED) {
            return Promise.reject(new AxiosError(NetworkError.ECONNABORTED.message, NetworkError.ECONNABORTED.code));
          }
      }
    }
  },
);

export default axiosInstance;
