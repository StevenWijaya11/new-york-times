import { USER_PREFERENCE } from '@core/constant/constant';
import { UserPreference } from '@core/models/userPreference';
import { SQLiteDatabase } from 'react-native-sqlite-storage';

export const userPreferenceDataSource = (db: SQLiteDatabase) => {
  const saveUserPreference = async (preference: UserPreference) => {
    try {
      await db.executeSql(
        `INSERT INTO ${USER_PREFERENCE} (id, theme, lang_tag) 
        VALUES (?,?,?) 
        ON CONFLICT(id) DO UPDATE SET 
          theme = excluded.theme,
          lang_tag = excluded.lang_tag`,
        [1, preference.theme, preference.language],
      );
    } catch (error) {
      throw Error('Failed to save');
    }
  };

  const getUserPreference = async () => {
    const result = await db.executeSql(`SELECT * FROM ${USER_PREFERENCE} WHERE id = 1`);
    return result;
  };

  return {
    saveUserPreference,
    getUserPreference,
  };
};
