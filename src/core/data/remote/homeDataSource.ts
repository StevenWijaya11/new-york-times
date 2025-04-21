import { MOST_VIEWED_ENDPOINT, TOP_STORIES } from '@core/constant/apiPath';
import { AxiosInstance } from 'axios';

export const homeDataSource = (apiClient: AxiosInstance) => ({
  async getMostViewedArticles() {
    return await apiClient.get(MOST_VIEWED_ENDPOINT);
  },

  async getSelectedStoryArticles(selectedStory: string) {
    const encodedSelectedStories = encodeURIComponent(selectedStory);
    return await apiClient.get(TOP_STORIES.concat(encodedSelectedStories, '.json'));
  },
});
