import { mapSelectedStoryArticles } from '@core/data/mappers/mapSelectedStoryArticles';
import { mapMostViewedArticles } from '@core/data/mappers/mapMostViewedArticles';
import { mapError } from '@core/data/mappers/mapError';
import { Article } from '@core/models/article';
import { homeDataSource } from '@core/data/remote/homeDataSource';
import { Result } from 'src/types/result';

export const homeRepository = (homeRemoteDataSource: ReturnType<typeof homeDataSource>) => {
  const fetchMostViewedArticles = async (): Promise<Result<Article[]>> => {
    try {
      const response = await homeRemoteDataSource.getMostViewedArticles();
      const data = response.data.results;
      return { data: mapMostViewedArticles(data) };
    } catch (err) {
      return mapError(err);
    }
  };

  const fetchSelectedStoryArticles = async (selectedStory: string): Promise<Result<Article[]>> => {
    try {
      const response = await homeRemoteDataSource.getSelectedStoryArticles(selectedStory);
      const data = response.data.results;
      return { data: mapSelectedStoryArticles(data) };
    } catch (err) {
      return mapError(err);
    }
  };

  return { fetchMostViewedArticles, fetchSelectedStoryArticles };
};
