import { homeRepository } from '@core/data/repositories/homeRepository';
import { ServiceContainer } from '@core/data/service-container/serviceContainer';
import { Article } from '@core/models/article';
import { isSuccess } from '@utils/isSuccess';
import { useEffect, useState } from 'react';
import { Failure } from 'src/types/result';

export const useMostViewedArticles = (homeRepo: ReturnType<typeof homeRepository> = ServiceContainer.homeRepo) => {
  const [mostViewedArticles, setMostViewedArticles] = useState<Article[]>([]);
  const [isMostViewedLoading, setLoading] = useState(false);
  const [mostViewedError, setMostViewedError] = useState<Failure | null>(null);

  const loadMostViewedArticles = async () => {
    setLoading(true);
    setMostViewedError(null);

    const result = await homeRepo.fetchMostViewedArticles();
    if (isSuccess(result)) {
      setMostViewedArticles(result.data);
    } else {
      setMostViewedError(result);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadMostViewedArticles();
  }, []);

  return { mostViewedArticles, isMostViewedLoading, mostViewedError, loadMostViewedArticles };
};
