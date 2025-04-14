import { getLocales } from 'react-native-localize';
import { Languages } from 'src/enums/languages';

export const getCurrentUserLanguage = () => {
  const locales = getLocales();
  return Array.isArray(locales) && locales.length > 0 ? locales[0].languageTag : Languages.English;
};
