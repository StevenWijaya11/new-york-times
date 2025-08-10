import { UserPreference } from '@core/models/userPreference';
import { userPreferenceDataSource } from '../dataSource/local/userPreferenceDataSource';
import { Result } from 'src/types/result';
import { ResultSet } from 'react-native-sqlite-storage';
import { mapUserPreference } from '../mappers/mapUserPreference';
import { AxiosError } from 'axios';

export const userPreferenceRepository = (
  userPreferenceLocalDataSource: ReturnType<typeof userPreferenceDataSource>,
) => {
  const getUserPreference = async (): Promise<Result<UserPreference>> => {
    try {
      const response = await userPreferenceLocalDataSource.getUserPreference();

      const userPreference = mapUserPreference(response);
      return { data: userPreference };
    } catch (error) {
      return {
        error: new AxiosError(),
        statusCode: (error as any)?.response?.status,
      };
    }
  };

  const updateUserPreference = async (userPreference: UserPreference): Promise<Result<UserPreference>> => {
    try {
      await userPreferenceLocalDataSource.saveUserPreference(userPreference);
      return { data: userPreference };
    } catch (error) {
      return {
        error: new AxiosError(),
        statusCode: (error as any)?.response?.status,
      };
    }
  };

  return {
    getUserPreference,
    updateUserPreference,
  };
};
