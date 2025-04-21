import { homeDataSource } from '../remote/homeDataSource';
import { searchDataSource } from '../remote/searchDataSource';
import { homeRepository } from '../repositories/homeRepository';
import { searchRepository } from '../repositories/searchRepository';
import axiosInstance from './axiosInstance';

const homeRemoteDataSource = homeDataSource(axiosInstance);
const homeRepo = homeRepository(homeRemoteDataSource);

const searchRemoteDataSource = searchDataSource(axiosInstance);
const searchRepo = searchRepository(searchRemoteDataSource);

export const ServiceContainer = {
  homeRepo,
  searchRepo,
};
