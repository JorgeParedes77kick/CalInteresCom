import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import AxiosService from 'services/axios.service';

import AppHookContainer from './AppHookContainer';

AxiosService.getInstance();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppHookContainer />
  </StrictMode>,
);
