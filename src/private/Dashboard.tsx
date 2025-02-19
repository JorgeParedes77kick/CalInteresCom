import { ReactNode } from 'react';

interface DashboardProps {
  children?: ReactNode;
}
export const Dashboard = ({ children }: DashboardProps) => {
  return (
    <>
      <h1> ESTE ES UN DASHBOARD</h1>
    </>
  );
};
