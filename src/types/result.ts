import { AxiosError } from 'axios';

export type Success<T> = { data: T };
export type Failure = { errorMessage?: string; errorCode?: string; statusCode?: number };

export type Result<T> = Success<T> | Failure;
