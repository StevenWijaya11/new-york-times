import { SEARCH_ARTICLE } from '@core/constant/constant';
import { Article } from '@core/models/article';
import { ResultSet, SQLiteDatabase } from 'react-native-sqlite-storage';

export const searchLocalDataSource = (db: SQLiteDatabase) => {
  const saveSearchArticles = async (searchArticles: Article[]) => {
    try {
      await db.transaction(async (tx) => {
        for (const article of searchArticles) {
          const { id, title, abstract, imageUrl, author, caption, credit, publishedDate } = article;
          tx.executeSql(
            `INSERT INTO ${SEARCH_ARTICLE} (id, title, abstract, imageUrl, author, caption, credit, published_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                ON CONFLICT(id) DO UPDATE SET
                title = excluded.title,
                abstract = excluded.abstract,
                author = excluded.author,
                caption = excluded.caption,
                credit = excluded.credit,
                published_date = excluded.published_date`,
            [id, title, abstract, imageUrl, author, caption, credit, publishedDate],
          );
        }
      });
    } catch (error) {
      throw Error('Failed to save.');
    }
  };

  const getSearchArticle = async (searchQuery: string, page: number, limit = 10): Promise<ResultSet> => {
    const offset = page * limit;

    const result = await db.executeSql(
      `SELECT * FROM ${SEARCH_ARTICLE} 
      WHERE title LIKE ? 
      ORDER BY published_date DESC
      LIMIT ? OFFSET ?`,
      [`%${searchQuery}%`, limit, offset],
    );

    return result[0];
  };

  return { saveSearchArticles, getSearchArticle };
};
