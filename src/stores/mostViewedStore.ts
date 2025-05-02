import { ServiceContainer } from '@core/data/service-container/serviceContainer';
import { Article } from '@core/models/article';
import { isSuccess } from '@utils/isSuccess';
import { Failure } from 'src/types/result';
import { create } from 'zustand';

interface MostViewedState {
  mostViewedArticles: Article[];
  isMostViewedLoading: boolean;
  mostViewedError: Failure | null;
}

interface MostViewedAction {
  fetchMostViewedArticles: () => Promise<void>;
}

const initialState: MostViewedState = {
  mostViewedArticles: [],
  isMostViewedLoading: true,
  mostViewedError: null,
};

const useMostViewedStore = create<MostViewedState & MostViewedAction>()((set) => ({
  ...initialState,
  fetchMostViewedArticles: async () => {
    set({ ...initialState });
    const result = await ServiceContainer.homeRepo.fetchMostViewedArticles();
    if (isSuccess(result)) {
      set({ mostViewedArticles: result.data, isMostViewedLoading: false });
    } else {
      set({ mostViewedError: result, isMostViewedLoading: false });
    }
  },
}));

export default useMostViewedStore;
