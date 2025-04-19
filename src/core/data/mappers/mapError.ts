import { AxiosError } from 'axios';
import { Failure } from 'src/types/result';

export const mapError = (err: unknown): Failure => {
  const axiosError = err as AxiosError;
  return {
    error: axiosError,
    statusCode: axiosError.response?.status,
  };
};
