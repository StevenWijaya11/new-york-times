import { Result, Success } from 'src/types/result';

export const isSuccess = <T>(result: Result<T>): result is Success<T> => {
  return (result as Success<T>).data !== undefined;
};
