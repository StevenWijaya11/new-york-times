import { Article } from '@core/models/article';
import { createSlice } from '@reduxjs/toolkit';
import { Stories } from 'src/enums/stories';
import { Failure } from 'src/types/result';
import { fetchInterest } from '../thunks/interestThunk';
import { INTEREST } from '@core/constant/constants';

interface InterestState {
  articles: Article[];
  loading: boolean;
  error: Failure | null;
  selectedStory: string;
}

const initialState: InterestState = {
  articles: [],
  loading: false,
  error: null,
  selectedStory: Stories.Arts,
};

const interestSlice = createSlice({
  name: INTEREST,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInterest.pending, (state, action) => {
        state.articles = [];
        state.loading = true;
        state.error = null;
        state.selectedStory = action.meta.arg;
      })
      .addCase(fetchInterest.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(fetchInterest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? null;
      });
  },
});

export const interestReducer = interestSlice.reducer;
