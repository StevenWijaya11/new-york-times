import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '@resources/locale/en.json';
import id from '@resources/locale/id.json';
import { Languages } from 'src/enums/languages';
import userPreferenceStore from 'src/stores/userPreferenceStore';
import { getSelectedLanguage } from '@utils/localizationUtils';

export const initializeI18n = async () => {
  await userPreferenceStore.getState().getUserPreference();
  const { userPreference } = userPreferenceStore.getState();
  const selectedLang = getSelectedLanguage(userPreference.language);

  await i18n.use(initReactI18next).init({
    compatibilityJSON: 'v4',
    lng: selectedLang,
    fallbackLng: Languages.English,
    debug: true,
    resources: {
      'en-MY': { translation: en },
      'id-MY': { translation: id },
    },
    interpolation: {
      escapeValue: false,
    },
  });
};

export default i18n;
