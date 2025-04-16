import { storiesList } from '@core/constant/storiesList';
import { Article } from '@core/models/article';
import { fetchSelectedStories } from '@core/services/homeService';
import { useEffect, useState } from 'react';
import { Failure } from 'src/types/result';

export const interesetViewModel = () => {
  const [interestError, setInterestError] = useState<Failure | null>(null);
  const [selectedStory, setSelectedStory] = useState<string>(storiesList[0]);
  const [selectedStoryArticles, setSelectedStoryArticles] = useState<Article[]>([]);
  const [isInterestLoading, setLoading] = useState(false);

  const loadSelectedStory = async (selectedStory: string) => {
    setLoading(true);
    setInterestError(null);

    const result = await fetchSelectedStories(selectedStory);

    if ('data' in result) {
      setSelectedStoryArticles(result.data);
    } else {
      const error = {
        error: result.error,
        statusCode: result.statusCode,
      } as Failure;
      setInterestError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadSelectedStory(selectedStory)
  }, [selectedStory]);

  return { selectedStoryArticles, isInterestLoading, interestError, selectedStory, setSelectedStory };
};
