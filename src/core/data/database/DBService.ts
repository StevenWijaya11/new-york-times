import { MOST_VIEWED } from '@core/constant/constant';
import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';

enablePromise(true);

let db: SQLiteDatabase | null = null;

export const openDb = async (): Promise<SQLiteDatabase> => {
  if (db) return db;

  try {
    db = await openDatabase({ name: 'NewYorkTimesData.db', location: 'default' });
    await initializeTables(db);
    return db;
  } catch (error) {
    throw new Error('Failed to connect to the local database.');
  }
};

export const initializeTables = async (db: SQLiteDatabase) => {
  try {
    const query = `CREATE TABLE IF NOT EXISTS ${MOST_VIEWED} (
        id TEXT PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        abstract TEXT NOT NULL,
        imageUrl TEXT,
        author TEXT NOT NULL,
        caption TEXT NOT NULL,
        credit TEXT NOT NULL,
        publishedDate TEXT NOT NULL,
        category TEXT NOT NULL
        )`;

    await db.executeSql(query);
  } catch (error) {
    throw new Error(`Failed to initialize the table.`);
  }
};
