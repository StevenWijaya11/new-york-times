import { searchDataSource } from '@core/data/dataSource/remote/searchDataSource';
import { Article } from '@core/models/article';
import { mapSearchArticles } from '@core/data/mappers/mapSearchArticles';
import { mapError } from '@core/data/mappers/mapError';
import { Result } from 'src/types/result';
import { searchLocalDataSource } from '../dataSource/local/searchLocalDataSource';
import { mapLocalSearchArticles } from '../mappers/mapLocalSearchArticle';

export const searchRepository = (
  searchRemoteDataSource: ReturnType<typeof searchDataSource>,
  localDataSource: ReturnType<typeof searchLocalDataSource>,
) => {
  const fetchSearchArticles = async (
    page: number,
    searchQuery: string,
    isConnected: boolean,
  ): Promise<Result<Article[]>> => {
    try {
      let searchArticles: Article[] = [];

      if (isConnected) {
        const response = await searchRemoteDataSource.getSearchArticles(page, searchQuery);
        const data = response.data.response.docs;
        searchArticles = mapSearchArticles(data);
        await localDataSource.saveSearchArticles(searchArticles);
      } else {
        const response = await localDataSource.getSearchArticle(searchQuery, page);
        if (response.rows.length === 0) {
          return { data: [] };
        }
        searchArticles = mapLocalSearchArticles(response);
      }
      return { data: searchArticles };
    } catch (err) {
      return mapError(err);
    }
  };

  return { fetchSearchArticles };
};
