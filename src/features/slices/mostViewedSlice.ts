import { Article } from '@core/models/article';
import { createSlice } from '@reduxjs/toolkit';
import { Failure } from 'src/types/result';
import { fetchMostVieweds } from '../thunks/mostViewedThunk';
import { MOST_VIEWED } from '@core/constant/constants';

interface MostViewedState {
  articles: Article[];
  loading: boolean;
  error: Failure | null;
}

const initialState: MostViewedState = {
  articles: [],
  loading: true,
  error: null,
};

const mostViewedSlice = createSlice({
  name: MOST_VIEWED,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMostVieweds.pending, () => ({
        ...initialState,
      }))
      .addCase(fetchMostVieweds.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(fetchMostVieweds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? null;
      });
  },
});

export const mostViewedReducer = mostViewedSlice.reducer;
