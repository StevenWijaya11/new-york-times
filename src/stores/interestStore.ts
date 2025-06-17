import { Service } from '@core/data/service-container/serviceContainer';
import { Article } from '@core/models/article';
import { isSuccess } from '@utils/isSuccess';
import { Stories } from 'src/enums/stories';

import { Failure } from 'src/types/result';
import { create } from 'zustand';
import { useNetworkStore } from './networkStore';

interface InterestState {
  selectedStoryArticles: Article[];
  selectedStory: string;
  isInterestLoading: boolean;
  interestError: Failure | null;
}

interface InterestAction {
  fetchSelectedStoryArticles: (selectedStory: string) => Promise<void>;
  setSelectedStory: (story: string) => void;
}

const initialState: InterestState = {
  selectedStoryArticles: [],
  selectedStory: Stories.Arts,
  isInterestLoading: true,
  interestError: null,
};

const useInterestStore = create<InterestState & InterestAction>()((set) => ({
  ...initialState,
  fetchSelectedStoryArticles: async (selectedStory) => {
    set({ selectedStoryArticles: [], isInterestLoading: true, interestError: null });

    const isConnected = useNetworkStore.getState().isConnected;
    const result = await Service().homeRepo.fetchSelectedStoryArticles(selectedStory, isConnected);

    if (isSuccess(result)) {
      set({ selectedStoryArticles: result.data, isInterestLoading: false });
    } else {
      set({ interestError: result, isInterestLoading: false });
    }
  },
  setSelectedStory: (story) => {
    set({ selectedStory: story });
  },
}));

export default useInterestStore;
