import { localizedErrorMessage } from '@utils/localizationUtils';
import { t } from 'i18next';
import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import { Failure } from 'src/types/result';

interface Props {
  loading: boolean;
  error: Failure | null;
  onRefresh: () => void;
  children: React.ReactNode;
}

export const StatefulContentWrapper = ({ loading, error, onRefresh, children }: Props) => {
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' />
      </View>
    );
  } else if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorTitle}>{t('Errors.SomethingWentWrong')}</Text>
        <Text style={styles.errorDescription}>{localizedErrorMessage(error)}</Text> 
        <TouchableOpacity
          style={styles.button}
          onPress={onRefresh}
        >
          <Text> {'Retry'}</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return <>{children}</>;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 10,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorDescription: {
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    paddingHorizontal: 30,
    height: 35,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
});
