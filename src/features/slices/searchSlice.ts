import { INITIAL_PAGE, SEARCH_ARTICLE } from '@core/constant/constants';
import { Article } from '@core/models/article';
import { createSlice } from '@reduxjs/toolkit';
import { Failure } from 'src/types/result';
import { fetchSearchArticle } from '../thunks/searchTrunk';

interface SearchState {
  articles: Article[];
  page: number;
  searchQuery: string;
  isInitialLoading: boolean;
  isLoadingMore: boolean;
  initialLoadError: Failure | null;
  loadMoreError: Failure | null;
  hasData: boolean;
}

const initialState: SearchState = {
  articles: [],
  page: INITIAL_PAGE,
  searchQuery: '',
  isInitialLoading: false,
  isLoadingMore: false,
  initialLoadError: null,
  loadMoreError: null,
  hasData: false,
};

const articleSlice = createSlice({
  name: SEARCH_ARTICLE,
  initialState,
  reducers: {
    resetPage: () => initialState,
    refreshPage: (state) => {
      state.page = INITIAL_PAGE;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.page = INITIAL_PAGE;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchArticle.pending, (state) => {
        state.initialLoadError = null;
        state.loadMoreError = null;

        if (state.page === INITIAL_PAGE) {
          state.isInitialLoading = true;
        } else {
          state.isLoadingMore = true;
        }
      })
      .addCase(fetchSearchArticle.fulfilled, (state, action) => {
        state.hasData = action.payload.length > 0;
        if (state.page === INITIAL_PAGE) {
          state.articles = action.payload;
          state.isInitialLoading = false;
        } else {
          state.articles = [...state.articles, ...action.payload];
          state.isLoadingMore = false;
        }
        state.page += 1;
      })
      .addCase(fetchSearchArticle.rejected, (state, action) => {
        if (state.page === INITIAL_PAGE) {
          state.initialLoadError = action.payload ?? null;
          state.isInitialLoading = false;
        } else {
          state.loadMoreError = action.payload ?? null;
          state.isLoadingMore = false;
        }
      });
  },
});

export const { refreshPage, resetPage, setSearchQuery } = articleSlice.actions;
export const searchReducer = articleSlice.reducer;
