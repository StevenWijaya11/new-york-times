import { MOST_VIEWED_ENDPOINT, TOP_STORIES } from '@core/constant/apiPath';
import { AxiosInstance } from 'axios';

export const homeDataSource = (apiClient: AxiosInstance) => ({
  getMostViewedArticles() {
    return apiClient.get(MOST_VIEWED_ENDPOINT);
  },

  getSelectedStoryArticles(selectedStory: string) {
    const encodedSelectedStories = encodeURIComponent(selectedStory);
    return apiClient.get(TOP_STORIES.concat(encodedSelectedStories, '.json'));
  },
});
