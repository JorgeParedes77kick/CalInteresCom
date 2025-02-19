import { ReactNode } from 'react';

interface LoginProps {
  children?: ReactNode;
}
export const Login = ({ children }: LoginProps) => {
  return (
    <>
      <h1>Este es el Login</h1>
    </>
  );
};
