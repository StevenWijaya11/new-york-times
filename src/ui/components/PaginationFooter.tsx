import { localizedErrorMessage } from '@utils/localizationUtils';
import { View, ActivityIndicator, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Failure } from 'src/types/result';

interface PaginationFooterProps {
  isLoading: boolean;
  error: Failure | null;
  onRefresh: () => void;
}

const PaginationFooter: React.FC<PaginationFooterProps> = ({ isLoading, error, onRefresh }) => {
  if (isLoading) {
    return (
      <View style={styles.loadingIndicator}>
        <ActivityIndicator size='large' />
      </View>
    );
  } else if (error) {
    return (
      <View style={styles.errorContent}>
        <Text style={styles.errorDescription}>{localizedErrorMessage(error)}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={onRefresh}
        >
          <Text> {'Retry'}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  loadingIndicator: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
  },
  errorContent: {
    flexDirection: 'row',
    padding: 25,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
  },
  errorDescription: {
    fontSize: 15,
    textAlign: 'center',
    flexShrink: 1,
  },
  button: {
    paddingHorizontal: 20,
    height: 35,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
});

export default PaginationFooter;
