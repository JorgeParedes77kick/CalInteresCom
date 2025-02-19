import { GlobalContextProvider } from 'contexts/GlobalContext';
import { ModalContextProvider } from 'contexts/ModalContext';

import App from './App';
import AppRouter from './AppRouter';
import ErrorBoundary from './ErrorBoundary';

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
