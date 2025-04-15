import { AppError } from 'src/enums/appError';
import { ResponseStatus } from 'src/enums/responseStatus';

export type Sucess<T> = { type: ResponseStatus.Success; data: T };
export type Failure = { type: ResponseStatus.Failure; error: AppError };

export type Result<T> = Sucess<T> | Failure;
