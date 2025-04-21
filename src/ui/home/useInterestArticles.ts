import { ServiceContainer } from '@core/data/service-container/serviceContainer';
import { Article } from '@core/models/article';
import { isSuccess } from '@utils/isSuccess';

import { useEffect, useState } from 'react';
import { Stories } from 'src/enums/stories';
import { Failure } from 'src/types/result';

export const useInterestArticles = () => {
  const [interestError, setInterestError] = useState<Failure | null>(null);
  const [selectedStory, setSelectedStory] = useState<string>(Stories.Arts);
  const [selectedStoryArticles, setSelectedStoryArticles] = useState<Article[]>([]);
  const [isInterestLoading, setLoading] = useState(false);

  const loadSelectedStory = async (selectedStory: string) => {
    setLoading(true);
    setInterestError(null);

    const result = await ServiceContainer.homeRepo.fetchSelectedStoryArticles(selectedStory);

    if (isSuccess(result)) {
      setSelectedStoryArticles(result.data);
    } else {
      setInterestError(result);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadSelectedStory(selectedStory);
  }, [selectedStory]);

  return { selectedStoryArticles, isInterestLoading, interestError, selectedStory, setSelectedStory };
};
