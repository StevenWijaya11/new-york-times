import { ServiceContainer } from '@core/data/service-container/serviceContainer';
import { Article } from '@core/models/article';
import { isSuccess } from '@utils/isSuccess';
import { useEffect, useState } from 'react';
import { Failure } from 'src/types/result';

export const useMostViewedArticles = (reloadKey: number) => {
  const [mostViewedArticles, setMostViewedArticles] = useState<Article[]>([]);
  const [isMostViewedLoading, setLoading] = useState(false);
  const [mostViewedError, setMostViewedError] = useState<Failure | null>(null);

  const loadMostViewedArticles = async () => {
    setLoading(true);
    setMostViewedError(null);

    const result = await ServiceContainer.homeRepo.fetchMostViewedArticles();
    if (isSuccess(result)) {
      setMostViewedArticles(result.data);
    } else {
      setMostViewedError(result);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadMostViewedArticles();
  }, [reloadKey]);

  return { mostViewedArticles, isMostViewedLoading, mostViewedError, loadMostViewedArticles };
};
