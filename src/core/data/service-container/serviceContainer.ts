import { homeDataSource } from '../remote/homeDataSource';
import { homeRepository } from '../repositories/homeRepository';
import axiosInstance from './axiosInstance';

const homeRemoteDataSource = homeDataSource(axiosInstance);
const homeRepo = homeRepository(homeRemoteDataSource);

export const ServiceContainer = {
  homeRepo,
};
