import { Service } from '@core/data/service-container/serviceContainer';
import { UserPreference } from '@core/models/userPreference';
import { isSuccess } from '@utils/isSuccess';
import { getSelectedLanguage } from '@utils/localizationUtils';
import i18next from 'i18next';
import { Failure } from 'src/types/result';
import { create } from 'zustand';

interface UserPreferenceState {
  userPreference: UserPreference;
  error: Failure | null;
}

interface UserPreferenceAction {
  updateUserPreference: (newPreference: UserPreference) => void;
  getUserPreference: () => void;
}

const initialState: UserPreferenceState = {
  userPreference: {
    language: 'system',
    theme: 'system',
  },
  error: null,
};

const userPreferenceStore = create<UserPreferenceState & UserPreferenceAction>()((set) => ({
  ...initialState,
  updateUserPreference: async (newPreference) => {
    const result = await Service().userPreferenceRepo.updateUserPreference(newPreference);
    if (isSuccess(result)) {
      set({ userPreference: newPreference });
      await i18next.changeLanguage(getSelectedLanguage(result.data.language));
    } else {
      set({ error: result });
    }
  },

  getUserPreference: async () => {
    const result = await Service().userPreferenceRepo.getUserPreference();
    if (isSuccess(result)) {
      set({ userPreference: result.data });
    } else {
      set({ error: result });
    }
  },
}));

export default userPreferenceStore;
