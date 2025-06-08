import { MOST_VIEWED } from '@core/constant/constant';
import { SQLiteDatabase } from 'react-native-sqlite-storage';

export const migrations = [
  {
    version: 2,
    script: async (db: SQLiteDatabase) => {
      await db.executeSql(`ALTER TABLE ${MOST_VIEWED} ADD COLUMN content TEXT`);
    },
  },

  {
    version: 3,
    script: async (db: SQLiteDatabase) => {
      await db.executeSql(`ALTER TABLE ${MOST_VIEWED} ADD is_published BOOLEAN`);
    },
  },
];
