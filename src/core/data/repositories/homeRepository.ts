import { mapError } from '@core/data/mappers/mapError';
import { mapMostViewedArticles } from '@core/data/mappers/mapMostViewedArticles';
import { Article } from '@core/models/article';
import { Result } from 'src/types/result';
import { homeDataSource } from '../remote/homeDataSource';
import { mapSelectedStoryArticles } from '@core/data/mappers/mapSelectedStoryArticles';

export const homeRepository = (homeRemoteDataSource: ReturnType<typeof homeDataSource>) => {
  const fetchMostViewedArticles = async (): Promise<Result<Article[]>> => {
    try {
      const response = await homeRemoteDataSource.getMostViewedArticles();
      const data = response.data.results;
      return {data: mapMostViewedArticles(data)}
    } catch (err) {
      return mapError(err);
    }
  };

  const fetchSelectedStoryArticles = async (selectedStory: string): Promise<Result<Article[]>> => {
    try {
      const response = await homeRemoteDataSource.getSelectedStoryArticles(selectedStory);
      const data = response.data.results;
      return {data: mapSelectedStoryArticles(data)}
    } catch (err) {
      return mapError(err);
    }
  };

  return {fetchMostViewedArticles, fetchSelectedStoryArticles}
};
