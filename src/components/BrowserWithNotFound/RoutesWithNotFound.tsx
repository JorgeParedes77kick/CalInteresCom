import { ReactNode } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

interface RoutesWithNotFoundProps {
  children: ReactNode;
}
export const RoutesWithNotFound = ({ children }: RoutesWithNotFoundProps) => {
  return (
    <Routes>
      {children}
      <Route path="*" element={<Navigate to={'/404'} />} />
      <Route path="/404" element={<h1>Pagina no encontrada</h1>} />
    </Routes>
  );
};
