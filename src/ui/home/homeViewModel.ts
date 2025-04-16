import { Article } from '@core/models/article';
import { fetchMostViewedArticles } from '@core/services/homeService';
import { useEffect, useState } from 'react';
import { Failure } from 'src/types/result';

export const homeViewModel = () => {
  const [mostViewedArticles, setMostViewedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Failure | null>(null);

  const loadMostViewedArticles = async () => {
    setLoading(true);
    setError(null);

    const result = await fetchMostViewedArticles();

    if ('data' in result) {
      setMostViewedArticles(result.data);
    } else {
      const error = {
        error: result.error,
        statusCode: result.statusCode,
      } as Failure;
      setError(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadMostViewedArticles();
  }, []);

  return { mostViewedArticles, loading, error };
};
