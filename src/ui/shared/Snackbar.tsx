import { useNetworkStatus } from '@ui/hooks/sharedHooks/useNetworkStatus';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const SharedSnackbar = () => {
  const isConnected = useNetworkStatus();
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [message, setMessage] = useState<string>('');
  const [animation] = useState(new Animated.Value(0));

  const handleDismiss = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    setMessage(isConnected ? t('Shared.Online') : t('Shared.NoInternet'));
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [isConnected]);

  useEffect(() => {
    if (isVisible) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  return (
    <Animated.View style={[styles.snackBarContainer, { opacity: animation }]}>
      <View style={styles.snackBar}>
        <Text style={styles.snackBarText}>{message}</Text>
        <TouchableOpacity onPress={handleDismiss}>
          <Text style={styles.dismissText}>Dismiss</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  snackBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    alignItems: 'center',
  },
  snackBar: {
    backgroundColor: '#333',
    width: '100%',
    borderRadius: 5,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  snackBarText: {
    color: '#fff',
    fontSize: 16,
  },
  dismissText: {
    color: '#ff5252',
    fontWeight: 'bold',
  },
});

export default SharedSnackbar;
