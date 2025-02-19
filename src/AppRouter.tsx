import { RoutesWithNotFound } from 'components/BrowserWithNotFound/RoutesWithNotFound';
import { PrivateGuard } from 'guard/PrivateGuard';
import { PrivateRouter } from 'private/PrivateRouter';
import { Login } from 'public/Login';
import { BrowserRouter, Navigate, Route } from 'react-router-dom';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <RoutesWithNotFound>
        <Route path="/" element={<Navigate to={'/login'} />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route element={<PrivateGuard />}>
          <Route path="/private/*" element={<PrivateRouter />} />
        </Route>
      </RoutesWithNotFound>
    </BrowserRouter>
  );
};

export default AppRouter;
