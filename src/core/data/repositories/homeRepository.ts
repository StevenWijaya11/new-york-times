import { mapSelectedStoryArticles } from '@core/data/mappers/mapSelectedStoryArticles';
import { mapMostViewedArticles } from '@core/data/mappers/mapMostViewedArticles';
import { mapError } from '@core/data/mappers/mapError';
import { Article } from '@core/models/article';
import { homeDataSource } from '@core/data/dataSource/remote/homeDataSource';
import { Result } from 'src/types/result';
import { homeLocalDataSource } from '../dataSource/local/homeLocalDataSource';
import { MOST_VIEWED } from '@core/constant/constant';

export const homeRepository = (
  homeRemoteDataSource: ReturnType<typeof homeDataSource>,
  localDataSource: ReturnType<typeof homeLocalDataSource>,
) => {
  const fetchMostViewedArticles = async (isConnected: boolean): Promise<Result<Article[]>> => {
    try {
      let mostViewedArticles: Article[] = [];

      if (isConnected) {
        const response = await homeRemoteDataSource.getMostViewedArticles();
        const data = response.data.results;
        mostViewedArticles = mapMostViewedArticles(data);
        await localDataSource.saveHomeArticles(mostViewedArticles, MOST_VIEWED);
      } else {
        mostViewedArticles = await localDataSource.getHomeArticles(MOST_VIEWED);
      }
      return { data: mostViewedArticles };
    } catch (err) {
      return mapError(err);
    }
  };

  const fetchSelectedStoryArticles = async (
    selectedStory: string,
    isConnected: boolean,
  ): Promise<Result<Article[]>> => {
    try {
      let articles: Article[] = [];

      if (isConnected) {
        const response = await homeRemoteDataSource.getSelectedStoryArticles(selectedStory);
        const data = response.data.results;
        articles = mapSelectedStoryArticles(data);
        await localDataSource.saveHomeArticles(articles, selectedStory);
      } else {
        articles = await localDataSource.getHomeArticles(selectedStory);
      }
      return { data: articles };
    } catch (err) {
      return mapError(err);
    }
  };

  return { fetchMostViewedArticles, fetchSelectedStoryArticles };
};
