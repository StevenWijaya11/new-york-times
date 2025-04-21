import { AxiosError } from 'axios';

export type Success<T> = { data: T };
export type Failure = { error: AxiosError; statusCode?: number };

export type Result<T> = Success<T> | Failure;
