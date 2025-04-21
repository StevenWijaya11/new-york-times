import { searchDataSource } from '@core/data/remote/searchDataSource';
import { Article } from '@core/models/article';
import { mapSearchArticles } from '@core/data/mappers/mapSearchArticles';
import { mapError } from '@core/data/mappers/mapError';
import { Result } from 'src/types/result';;

export const searchRepository = (homeRemoteDataSource: ReturnType<typeof searchDataSource>) => {
  const fetchSearchArticles = async (page: number, searchQuery: string): Promise<Result<Article[]>> => {
    try {
      const response = await homeRemoteDataSource.getSearchArticles(page, searchQuery);
      const data = response.data.response.docs;
      return { data: mapSearchArticles(data) };
    } catch (err) {
      return mapError(err);
    }
  };

  return { fetchSearchArticles };
};
