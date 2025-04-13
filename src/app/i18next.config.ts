import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'react-native-localize';

import en from '@resources/locale/en.json';
import id from '@resources/locale/id.json';
import { getCurrentUserLanguage } from '@utils/localizationUtils';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  lng: getCurrentUserLanguage(),
  fallbackLng: 'en',
  debug: true,
  resources: {
    en: { translation: en },
    id: { translation: id },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
