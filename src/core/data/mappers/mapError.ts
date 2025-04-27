import { AxiosError } from 'axios';
import { Failure } from 'src/types/result';

export const mapError = (err: unknown): Failure => {
  const error = err as AxiosError;
  return {
    errorMessage: error.message,
    errorCode: error.code,
    statusCode: error.response?.status,
  };
};
