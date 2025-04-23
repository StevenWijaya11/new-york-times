import { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { t } from 'i18next';

export const useNetworkStatus = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, [isConnected]);

  return isConnected;
};
