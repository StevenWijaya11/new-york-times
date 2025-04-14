import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { I18nextProvider } from 'react-i18next';
import i18next from './i18next.config';

const App = () => {
  return (
    <I18nextProvider i18n={i18next}>
      <View style={styles.container}>
        <Text>{'Welcome'}</Text>
      </View>
    </I18nextProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default App;
