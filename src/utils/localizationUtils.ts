import { getLocales } from 'react-native-localize';

export const getCurrentUserLanguage = () => {
  const locales = getLocales();
  return Array.isArray(locales) && locales.length > 0 ? locales[0].languageCode : 'en';
};
