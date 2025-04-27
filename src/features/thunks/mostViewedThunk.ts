import { FETCH_MOST_VIEWED } from '@core/constant/constants';
import { ServiceContainer } from '@core/data/service-container/serviceContainer';
import { Article } from '@core/models/article';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isSuccess } from '@utils/isSuccess';
import { Failure } from 'src/types/result';

export const fetchMostVieweds = createAsyncThunk<Article[], void, { rejectValue: Failure }>(
  FETCH_MOST_VIEWED,
  async (_, thunkAPI) => {
    const result = await ServiceContainer.homeRepo.fetchMostViewedArticles();
    if (isSuccess(result)) {
      return result.data;
    } else {
      return thunkAPI.rejectWithValue(result);
    }
  },
);
