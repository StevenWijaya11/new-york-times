import { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';
import { getLocales } from 'react-native-localize';
import { Languages } from 'src/enums/languages';
import { Failure } from 'src/types/result';

export const getCurrentUserLanguage = () => {
  const locales = getLocales();
  return Array.isArray(locales) && locales.length > 0 ? locales[0].languageTag : Languages.English;
};

export const localizedErrorMessage = (err: Failure): string => {
  const { t } = useTranslation();

  if (err.error.code === AxiosError.ERR_NETWORK || err.error.code === AxiosError.ECONNABORTED) {
    return t('Errors.Ecconaborted');
  } else if (err.statusCode) {
    switch (err.statusCode) {
      case 400:
        return t('Errors.BadRequest');
      case 401:
        return t('Errors.Unauthorized');
      case 403:
        return t('Errors.Forbidden');
      case 404:
        return t('Errors.NotFound');
      case 429:
        return t('Errors.TooManyRequest');
      case 500:
        return t('Errors.ServerError');
    }
  } else if (err instanceof SyntaxError) {
    return t('Errors.ParseError');
  }
  return err.error.message ?? t('Errors.Unknown');
};
