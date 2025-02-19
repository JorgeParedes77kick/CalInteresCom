import { RoutesWithNotFound } from 'components/BrowserWithNotFound/RoutesWithNotFound';
import { Dashboard } from 'private/Dashboard';
import { ReactNode } from 'react';
import { Navigate, Route } from 'react-router-dom';

interface PrivateRouterProps {
  children?: ReactNode;
}
export const PrivateRouter = ({ children }: PrivateRouterProps) => {
  return (
    <RoutesWithNotFound>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/about" element={<Dashboard />} />
      <Route path="/users" element={<Dashboard />} />
      <Route path="/etc" element={<Dashboard />} />
    </RoutesWithNotFound>
  );
};
