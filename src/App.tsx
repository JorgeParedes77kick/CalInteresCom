import { ReactNode } from 'react';
import './app.scss';

interface Props {
  children: ReactNode;
}
const App = ({ children }: Props) => {
  return (
    <>
      <h1>Nav</h1>
      {children}
      <h1>Footer</h1>
    </>
  );
};

export default App;
