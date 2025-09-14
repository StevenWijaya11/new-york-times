import { MOST_VIEWED } from '@core/constant/constant';
import { Article } from '@core/models/article';
import { SQLiteDatabase } from 'react-native-sqlite-storage';

export const homeLocalDataSource = (db: SQLiteDatabase) => {
  const saveHomeArticles = async (homeArticles: Article[], category: string) => {
    try {
      await db.transaction(async (tx) => {
        for (const article of homeArticles) {
          const { id, title, abstract, imageUrl, author, caption, credit, publishedDate } = article;
          tx.executeSql(
            `INSERT INTO ${MOST_VIEWED} (id, title, abstract, imageUrl, author, caption, credit, published_date, category) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
             ON CONFLICT(id) DO UPDATE SET
              title = excluded.title,
              abstract = excluded.abstract,
              author = excluded.author,
              caption = excluded.caption,
              credit = excluded.credit,
              published_date = excluded.published_date,
              category = excluded.category`,
            [id, title, abstract, imageUrl, author, caption, credit, publishedDate, category],
          );
        }
      });
    } catch (error) {
      throw Error('Failed to save.');
    }
  };

  const getHomeArticles = async (category: string): Promise<Article[]> => {
    try {
      const homeArticles: Article[] = [];
      const results = await db.executeSql(`SELECT * FROM ${MOST_VIEWED} WHERE category = ?`, [category]);
      const resultSet = results[0];
      const rows = resultSet.rows;
      for (let i = 0; i < rows.length; i++) {
        homeArticles.push(rows.item(i));
      }

      return homeArticles;
    } catch (error) {
      throw Error('Failed to fetch.');
    }
  };

  return {
    saveHomeArticles,
    getHomeArticles,
  };
};
