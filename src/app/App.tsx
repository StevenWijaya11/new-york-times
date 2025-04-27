import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18next from './i18next.config';
import RootNavigator from './RootNavigator';
import { Provider } from 'react-redux'
import { store } from './store';

const App = () => {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18next}>
        <RootNavigator />
      </I18nextProvider>
    </Provider>
  );
};

export default App;
