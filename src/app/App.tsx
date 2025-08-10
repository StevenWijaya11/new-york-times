import React, { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18next, { initializeI18n } from './i18next.config';
import RootNavigator from './RootNavigator';
import { ServiceContainer } from '@core/data/service-container/serviceContainer';
import { useNetworkStatus } from '@ui/hooks/sharedHooks/useNetworkStatus';

const App = () => {
  const [ready, setReady] = useState(false);
  useNetworkStatus();

  const intitalizeService = async () => {
    try {
      await ServiceContainer.init();
      await initializeI18n();
      setReady(true);
    } catch (error) {}
  };
  useEffect(() => {
    intitalizeService();
    if (__DEV__) {
      // Dev is used to reset singleton on every reload (debugging)
      return () => {
        ServiceContainer['instance'] = null;
        setReady(false);
      };
    }
  }, []);

  if (!ready) {
    //To do show splash screen
    return null;
  }

  return (
    <I18nextProvider i18n={i18next}>
      <RootNavigator />
    </I18nextProvider>
  );
};

export default App;
