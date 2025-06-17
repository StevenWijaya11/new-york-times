import { IconButton } from 'react-native-paper';
import { useNetworkStore } from 'src/stores/networkStore';

export const NetworkStatusIcon: React.FC = () => {
  const isConnected = useNetworkStore((state) => state.isConnected);

  return (
    <IconButton
      icon={isConnected ? 'wifi' : 'wifi-off'}
      size={20}
      iconColor={isConnected ? 'green' : 'red'}
    />
  );
};
