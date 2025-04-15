import { Article } from '@core/models/article';
import axiosInstance from './axiosInstance';
import { Result } from 'src/types/result';
import { mapAxiosError } from '@utils/axiosError';
import { ResponseStatus } from 'src/enums/responseStatus';
import { MOST_VIEWED_ENDPOINT } from '@core/constant/apiPath';

export const fetchMostViewedArticles = async (): Promise<Result<Article[]>> => {
  try {
    const response = await axiosInstance.get(MOST_VIEWED_ENDPOINT);
    const results = response.data.results;
    const simplified: Article[] = results.map((item: any) => ({
      id: item.id,
      title: item.title,
      abstract: item.abstract,
      imageUrl: item.media?.[0]?.['media-metadata']?.[0]?.url,
    }));

    return { type: ResponseStatus.Success, data: simplified };
  } catch (err) {
    return { type: ResponseStatus.Failure, error: mapAxiosError(err) };
  }
};
