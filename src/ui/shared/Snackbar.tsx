import { t } from 'i18next';
import { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { useNetworkStore } from 'src/stores/networkStore';

const SharedSnackbar = () => {
  const isConnected = useNetworkStore((state) => state.isConnected);

  const prevIsConnected = useRef<boolean | null>(null);
  const [message, setMessage] = useState<string>('');
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    if (prevIsConnected.current !== null && prevIsConnected.current !== isConnected) {
      setMessage(isConnected ? t('Shared.Online') : t('Shared.NoInternet'));
    }
    prevIsConnected.current = isConnected;
  }, [isConnected]);

  useEffect(() => {
    if (message) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        const timer = setTimeout(() => {
          Animated.timing(animation, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            setMessage('');
          });
        }, 3000);

        return () => clearTimeout(timer);
      });
    }
  }, [message]);

  return (
    <Animated.View style={[styles.snackBarContainer, { opacity: animation }]}>
      <View style={styles.snackBar}>
        <Text style={styles.snackBarText}>{message}</Text>
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
  },
  snackBarText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SharedSnackbar;
