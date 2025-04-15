import { AxiosError } from 'axios';
import { AppError } from 'src/enums/appError';

export const mapAxiosError = (err: any): AppError => {
  if (err.code === AxiosError.ERR_NETWORK || err.code === AxiosError.ECONNABORTED) {
    return AppError.Ecconaborted;
  } else if (err.response) {
    const { status } = err.response;
    switch (status) {
      case 400:
        return AppError.BadRequest;
      case 401:
        return AppError.Unauthorized;
      case 403:
        return AppError.Forbidden;
      case 404:
        return AppError.NotFound;
      case 429:
        return AppError.TooManyRequest;
      case 500:
        return AppError.ServerError;
    }
  } else if (err instanceof SyntaxError) {
    return AppError.ParseErrror;
  }
  return AppError.Unknown;
};
