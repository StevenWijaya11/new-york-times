import { ARTICLE_SEARCH_ENDPOINT } from '@core/constant/apiPath';
import { AxiosInstance } from 'axios';

export const searchDataSource = (apiClient: AxiosInstance) => ({
  async getSearchArticles(page: number, searchQuery: string) {
    return await apiClient.get(ARTICLE_SEARCH_ENDPOINT, {
      params: { page: page, ...(searchQuery && { q: searchQuery }) },
    });
  },
});
