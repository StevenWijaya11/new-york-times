import { SQLiteDatabase } from 'react-native-sqlite-storage';
import { openDb } from '../database/DBService';
import { homeLocalDataSource } from '../dataSource/local/homeLocalDataSource';
import { homeDataSource } from '../dataSource/remote/homeDataSource';
import { searchDataSource } from '../dataSource/remote/searchDataSource';
import { homeRepository } from '../repositories/homeRepository';
import { searchRepository } from '../repositories/searchRepository';
import axiosInstance from './axiosInstance';
import { AxiosInstance } from 'axios';
import { userPreferenceRepository } from '../repositories/userPreferenceRepository';
import { userPreferenceDataSource } from '../dataSource/local/userPreferenceDataSource';
import { searchLocalDataSource } from '../dataSource/local/searchLocalDataSource';

export class ServiceContainer {
  private static instance: ServiceContainer | null = null;

  public readonly homeRepo: ReturnType<typeof homeRepository>;
  public readonly searchRepo: ReturnType<typeof searchRepository>;
  public readonly userPreferenceRepo: ReturnType<typeof userPreferenceRepository>;

  private constructor(private db: SQLiteDatabase, private axios: AxiosInstance) {
    this.homeRepo = this.createHomeRepo();
    this.searchRepo = this.createSearchRepo();
    this.userPreferenceRepo = this.createUserPreferenceRepo();
  }

  private createHomeRepo(): ReturnType<typeof homeRepository> {
    const homeRemote = homeDataSource(this.axios);
    const homeLocal = homeLocalDataSource(this.db);
    return homeRepository(homeRemote, homeLocal);
  }

  private createSearchRepo(): ReturnType<typeof searchRepository> {
    const searchRemote = searchDataSource(this.axios);
    const searchLocal = searchLocalDataSource(this.db)
    return searchRepository(searchRemote, searchLocal);
  }

  private createUserPreferenceRepo(): ReturnType<typeof userPreferenceRepository> {
    const userPreferenceLocal = userPreferenceDataSource(this.db);
    return userPreferenceRepository(userPreferenceLocal);
  }

  public static async init(): Promise<void> {
    if (ServiceContainer.instance) return;
    const db = await openDb();
    ServiceContainer.instance = new ServiceContainer(db, axiosInstance);
  }

  public static getInstance(): ServiceContainer {
    if (!ServiceContainer.instance) {
      throw new Error('ServiceContainer not initialized. Call init() first.');
    }
    return ServiceContainer.instance;
  }
}

export const Service = (): ServiceContainer => {
  return ServiceContainer.getInstance();
};
