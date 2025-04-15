import { Article } from '@core/models/article';
import { fetchMostViewedArticles } from '@core/services/homeService';
import { useEffect, useState, useTransition } from 'react';
import { useTranslation } from 'react-i18next';
import { AppError } from 'src/enums/appError';
import { ResponseStatus } from 'src/enums/responseStatus';

export const homeViewModel = () => {
  const [mostViewedArticles, setMostViewedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  const loadMostViewedArticles = async () => {
    setLoading(true);
    setError(null);

    const result = await fetchMostViewedArticles();

    if (result.type === ResponseStatus.Success) {
      setMostViewedArticles(result.data);
    } else {
      const translationKey = `Errors.${AppError[result.error]}`;
      const errorMessage = t(translationKey);
      setError(errorMessage);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadMostViewedArticles();
  }, []);

  return { mostViewedArticles, loading, error };
};
