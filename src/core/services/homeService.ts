import { Article, MostViewedArticleModel } from '@core/models/article';
import axiosInstance from './axiosInstance';
import { Result } from 'src/types/result';
import { MOST_VIEWED_ENDPOINT, TOP_STORIES } from '@core/constant/apiPath';
import { AxiosError } from 'axios';

export const fetchMostViewedArticles = async (): Promise<Result<MostViewedArticleModel[]>> => {
  try {
    const response = await axiosInstance.get(MOST_VIEWED_ENDPOINT);
    const results = response.data.results;
    const simplified: MostViewedArticleModel[] = results.map((item: any) => ({
      id: item.id,
      title: item.title,
      abstract: item.abstract,
      imageUrl: item.media?.[0]?.['media-metadata']?.[0]?.url,
    }));

    return { data: simplified };
  } catch (err) {
    const axiosError = err as AxiosError;
    return {
      error: axiosError,
      statusCode: axiosError.response?.status,
    };
  }
};

export const fetchSelectedStories = async (selectedStory: string): Promise<Result<Article[]>> => {
  try {
    const encodedSelectedStories = encodeURIComponent(selectedStory);
    const response = await axiosInstance.get(TOP_STORIES.concat(encodedSelectedStories, '.json'));
    const results = response.data.results;
    const simplified: Article[] = results.map((item: any) => ({
      title: item.title,
      abstract: item.abstract,
      imageUrl: item.multimedia?.[0]?.url,
      author: item.byline,
      publishedDate: item.published_date,
    }));

    return { data: simplified };
  } catch (err) {
    const axiosError = err as AxiosError;
    return {
      error: axiosError,
      statusCode: axiosError.response?.status,
    };
  }
};
