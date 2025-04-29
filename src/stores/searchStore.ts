import { INITIAL_PAGE } from '@core/constant/constant';
import { ServiceContainer } from '@core/data/service-container/serviceContainer';
import { Article } from '@core/models/article';
import { isSuccess } from '@utils/isSuccess';

import { Failure } from 'src/types/result';
import { create } from 'zustand';

interface SearchState {
  articles: Article[];
  page: number;
  searchQuery: string;
  isInitialLoading: boolean;
  isLoadingMore: boolean;
  initialLoadError: Failure | null;
  loadMoreError: Failure | null;
  hasEnoughData: boolean;
}

interface SearchAction {
  fetchInitialSearchArticles: () => Promise<void>;
  fetchNextSearchArticles: () => Promise<void>;
  setSearchQuery: (query: string) => void;
  resetState: () => void;
}

const initialState: SearchState = {
  articles: [],
  page: INITIAL_PAGE,
  searchQuery: '',
  isInitialLoading: false,
  isLoadingMore: false,
  initialLoadError: null,
  loadMoreError: null,
  hasEnoughData: false,
};

const useSearchStore = create<SearchState & SearchAction>()((set, get) => ({
  ...initialState,
  fetchInitialSearchArticles: async () => {
    const { searchQuery } = get();
    set({
      ...initialState,
      isInitialLoading: true,
      searchQuery: searchQuery,
    });

    const result = await ServiceContainer.searchRepo.fetchSearchArticles(INITIAL_PAGE, searchQuery);

    if (isSuccess(result)) {
      set((state) => ({
        articles: result.data,
        isInitialLoading: false,
        hasEnoughData: result.data.length >= 10,
        page: state.page + 1,
      }));
    } else {
      set({ initialLoadError: result, isInitialLoading: false });
    }
  },
  fetchNextSearchArticles: async () => {
    const { page, searchQuery, isLoadingMore, hasEnoughData } = get();
    if (isLoadingMore || !hasEnoughData) return;

    set({ isLoadingMore: true, initialLoadError: null, loadMoreError: null });

    const result = await ServiceContainer.searchRepo.fetchSearchArticles(page, searchQuery);

    if (isSuccess(result)) {
      set((state) => ({ articles: [...state.articles, ...result.data], page: state.page + 1, isLoadingMore: false }));
    } else {
      set({ loadMoreError: result, isLoadingMore: false });
    }
  },
  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
  },
  resetState: () => set(initialState),
}));

export default useSearchStore;
