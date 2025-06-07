import { useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { useNetworkStore } from 'src/stores/networkStore';

export const useNetworkStatus = () => {
  const setIsConnected = useNetworkStore((state) => state.setIsConnected);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(!!state.isConnected);
    });

    NetInfo.fetch().then((state) => setIsConnected(!!state.isConnected));

    return () => unsubscribe();
  }, [setIsConnected]);
};