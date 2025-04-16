import { Article, MostViewedArticleModel } from '@core/models/article';
import { fetchMostViewedArticles } from '@core/services/homeService';
import { useEffect, useState } from 'react';
import { Failure } from 'src/types/result';

export const mostViewedViewModel = () => {
  const [mostViewedArticles, setMostViewedArticles] = useState<MostViewedArticleModel[]>([]);
  const [isMostViewedLoading, setLoading] = useState(false);
  const [mostViewedError, setMostViewedError] = useState<Failure | null>(null);

  const loadMostViewedArticles = async () => {
    setLoading(true);
    setMostViewedError(null);

    const result = await fetchMostViewedArticles();

    if ('data' in result) {
      setMostViewedArticles(result.data);
    } else {
      const error = {
        error: result.error,
        statusCode: result.statusCode,
      } as Failure;
      setMostViewedError(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadMostViewedArticles()
  }, []);

  return { mostViewedArticles, isMostViewedLoading, mostViewedError };
};
