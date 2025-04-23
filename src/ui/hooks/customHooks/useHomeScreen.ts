import { useState, useCallback } from 'react';

export const useHomeScreen = () => {
  const [reloadKey, setReloadKey] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const onRefresh = useCallback(() => {
    setReloadKey((prev) => prev + 1);

    setIsRefreshing(false);
  }, []);

  return {reloadKey, isRefreshing, onRefresh}
};
