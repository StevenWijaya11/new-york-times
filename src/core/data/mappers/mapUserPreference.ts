import { UserPreference } from '@core/models/userPreference';
import { ResultSet } from 'react-native-sqlite-storage';

export const mapUserPreference = (resultSet: ResultSet[]): UserPreference => {
  const item = resultSet[0].rows.item(0);

  return {
    language: item.lang_tag,
    theme: item.theme,
  };
};
