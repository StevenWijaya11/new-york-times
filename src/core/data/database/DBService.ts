import { MOST_VIEWED, USER_PREFERENCE, VERSION } from '@core/constant/constant';
import { DEBUG, enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';
import { migrations } from './migrations';

enablePromise(true);
DEBUG(true);

let db: SQLiteDatabase | null = null;

export const openDb = async (): Promise<SQLiteDatabase> => {
  if (db) return db;

  try {
    db = await openDatabase({ name: 'NewYorkTimesData.db', location: 'default' });
    await initializeTables(db);
    await applyMigrations(db);
    return db;
  } catch (error) {
    throw new Error('Failed to connect to the local database.');
  }
};

const getDatabaseVersion = async (db: SQLiteDatabase): Promise<number> => {
  const results = await db.executeSql(`SELECT version_number FROM ${VERSION} WHERE schema = "schema_version";`);
  const version = results[0].rows.item(0).version_number;
  return results[0].rows.length ? version : 1;
};

const setDatabaseVersion = async (db: SQLiteDatabase, version_number: number): Promise<void> => {
  await db.executeSql(`UPDATE ${VERSION} SET version_number = ? WHERE schema = 'schema_version'`, [version_number]);
};

const applyMigrations = async (db: SQLiteDatabase) => {
  const currentVersion = await getDatabaseVersion(db);
  for (const migration of migrations) {
    if (migration.version > currentVersion) {
      await migration.script(db);
      await setDatabaseVersion(db, migration.version);
    }
  }
};

export const initializeTables = async (db: SQLiteDatabase) => {
  try {
    const versionTable = `CREATE TABLE IF NOT EXISTS ${VERSION} (
      schema TEXT PRIMARY KEY NOT NULL,
      version_number INT NOT NULL
    )`;

    const initialVersion = `INSERT OR IGNORE INTO ${VERSION} (schema, version_number) 
      VALUES ("schema_version", 1)`;

    const homeTable = `CREATE TABLE IF NOT EXISTS ${MOST_VIEWED} (
      id TEXT PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      abstract TEXT NOT NULL,
      imageUrl TEXT,
      author TEXT NOT NULL,
      caption TEXT NOT NULL,
      credit TEXT NOT NULL,
      published_date TEXT NOT NULL,
      category TEXT NOT NULL
    )`;

    const userPreference = `CREATE TABLE IF NOT EXISTS ${USER_PREFERENCE} (
      id INTEGER PRIMARY KEY,
      theme TEXT,
      lang_tag TEXT
    ) `;

    const insertDefaultUserPreferences = `
      INSERT OR IGNORE INTO ${USER_PREFERENCE} (id, theme, lang_tag)
      VALUES (1, 'System', 'System');
    `;

    await db.executeSql(versionTable);
    await db.executeSql(initialVersion);
    await db.executeSql(homeTable);
    await db.executeSql(userPreference);
    await db.executeSql(insertDefaultUserPreferences);
    console.log('sss')
  } catch (error) {
    console.log('errorr', error)
    throw new Error(`Failed to initialize the table.`);
  }
};
