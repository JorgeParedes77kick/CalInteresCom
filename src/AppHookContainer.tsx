import { GlobalContextProvider } from 'contexts/GlobalContext';
import { ModalContextProvider } from 'contexts/ModalContext';

import App from './App';
import ErrorBoundary from './ErrorBoundary';
import AppRouter from './router/AppRouter';

const AppHookContainer = () => {
  return (
    <ErrorBoundary>
      <GlobalContextProvider>
        <ModalContextProvider>
          <App>
            <AppRouter />
          </App>
        </ModalContextProvider>
      </GlobalContextProvider>
    </ErrorBoundary>
  );
};

export default AppHookContainer;
