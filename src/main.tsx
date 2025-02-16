import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { MainContextProvider } from 'contexts/MainContext.tsx';
import { ModalContextProvider } from 'contexts/ModalContext.tsx';

import AxiosService from 'services/axios.service.ts';
import App from './App.tsx';
import ErrorBoundary from './ErrorBoundary.tsx';

AxiosService.getInstance();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <MainContextProvider>
        <ModalContextProvider>
          <App />
        </ModalContextProvider>
      </MainContextProvider>
    </ErrorBoundary>
  </StrictMode>,
);
