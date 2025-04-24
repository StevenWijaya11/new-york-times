import { ServiceContainer } from '@core/data/service-container/serviceContainer';
import { Article } from '@core/models/article';
import { useDebounce } from '@ui/hooks/sharedHooks/useDebounce';
import { isSuccess } from '@utils/isSuccess';
import { useState, useCallback, useEffect } from 'react';
import { Failure } from 'src/types/result';

export const useSearchArticle = () => {
  const initialPage = 0;
  const [page, setPage] = useState<number>(initialPage);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [articles, setArticles] = useState<Article[]>([]);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [initialLoadError, setInitialLoadError] = useState<Failure | null>(null);
  const [loadMoreError, setLoadMoreError] = useState<Failure | null>(null);
  const [hasData, setHasData] = useState<boolean>(false);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const clearError = () => {
    setInitialLoadError(null);
    setLoadMoreError(null);
  };

  const loadInitialSearchArticles = useCallback(async () => {
    setIsInitialLoad(true);
    clearError();
    setPage(initialPage);

    try {
      const result = await ServiceContainer.searchRepo.fetchSearchArticles(initialPage, searchQuery);

      if (isSuccess(result)) {
        setArticles(result.data);
        setPage((prevPage) => prevPage + 1);
        setHasData(result.data.length > 0)
      } else {
        setInitialLoadError(result);
      }
    } finally {
      setIsInitialLoad(false);
    }
  }, [searchQuery, isInitialLoad, initialLoadError, page]);

  const loadNextSearchArticles = useCallback(async () => {
    if (isInitialLoad || isLoadingMore || !hasData) return;

    setIsLoadingMore(true);
    clearError();

    try {
      const result = await ServiceContainer.searchRepo.fetchSearchArticles(page, searchQuery);

      if (isSuccess(result)) {
        setArticles((prevArticles) => [...prevArticles, ...result.data]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setLoadMoreError(result);
      }
    } finally {
      setIsLoadingMore(false);
    }
  }, [page, isLoadingMore, searchQuery, loadMoreError]);

  useEffect(() => {
    loadInitialSearchArticles();
  }, [debouncedSearchQuery]);

  return {
    articles,
    isInitialLoad,
    isLoadingMore,
    initialLoadError,
    loadMoreError,
    loadInitialSearchArticles,
    loadNextSearchArticles,
    searchQuery,
    setSearchQuery,
  };
};
