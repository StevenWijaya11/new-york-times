import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18next from './i18next.config';
import RootNavigator from './RootNavigator';

const App = () => {
  return (
    <I18nextProvider i18n={i18next}>
      <RootNavigator />;
    </I18nextProvider>
  );
};

export default App;