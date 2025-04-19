import { ServiceContainer } from '@core/data/service-container/serviceContainer';
import { MostViewedArticleModel } from '@core/models/article';
import { useEffect, useState } from 'react';
import { Failure } from 'src/types/result';

export const useMostViewedArticles = () => {
  const [mostViewedArticles, setMostViewedArticles] = useState<MostViewedArticleModel[]>([]);
  const [isMostViewedLoading, setLoading] = useState(false);
  const [mostViewedError, setMostViewedError] = useState<Failure | null>(null);

  const loadMostViewedArticles = async () => {
    setLoading(true);
    setMostViewedError(null);

    const result = await ServiceContainer.homeRepo.fetchMostViewedArticles();
    if ('data' in result) {
      setMostViewedArticles(result.data);
    } else {
      setMostViewedError(result);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadMostViewedArticles();
  }, []);

  return { mostViewedArticles, isMostViewedLoading, mostViewedError };
};
