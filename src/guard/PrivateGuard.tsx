import { Navigate, Outlet } from 'react-router-dom';
import { getLocalStorageItem } from 'utilities/storage.utility';

export const PrivateGuard = () => {
  const token = getLocalStorageItem('token');
  const authenticated = false;

  return token ? <Outlet /> : <Navigate to={'/login'} replace />;
};
