import { AxiosError } from 'axios';

export type Sucess<T> = { data: T };
export type Failure = { error: AxiosError; statusCode?: number };

export type Result<T> = Sucess<T> | Failure;
