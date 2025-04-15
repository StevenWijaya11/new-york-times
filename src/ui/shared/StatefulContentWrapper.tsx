import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

interface Props {
  loading: boolean;
  error: string | null;
  children: React.ReactNode;
}

export const StatefulContentWrapper = ({ loading, error, children }: Props) => {
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' />
      </View>
    );
  } else if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
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
    padding: 16,
  },
  errorText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
});
