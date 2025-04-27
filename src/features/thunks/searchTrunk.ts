import { FETCH_MOST_VIEWED, FETCH_SEARCH_ARTICLE } from '@core/constant/constants';
import { ServiceContainer } from '@core/data/service-container/serviceContainer';
import { Article } from '@core/models/article';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isSuccess } from '@utils/isSuccess';
import { Failure } from 'src/types/result';

export const fetchSearchArticle = createAsyncThunk<Article[], SearchArticleParam, { rejectValue: Failure }>(
  FETCH_SEARCH_ARTICLE,
  async ({ page, searchQuery }, thunkAPI) => {
    const result = await ServiceContainer.searchRepo.fetchSearchArticles(page, searchQuery);
    if (isSuccess(result)) {
      return result.data;
    } else {
      return thunkAPI.rejectWithValue(result);
    }
  },
);
