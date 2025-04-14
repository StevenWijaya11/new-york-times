import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '@resources/locale/en.json';
import id from '@resources/locale/id.json';
import { getCurrentUserLanguage } from '@utils/localizationUtils';
import { Languages } from 'src/enums/languages';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  lng: getCurrentUserLanguage(),
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

export default i18n;
