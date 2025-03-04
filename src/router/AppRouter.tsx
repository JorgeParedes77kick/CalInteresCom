import Interes from 'pages/Interes/Interes';
import InteresFormik from 'pages/InteresFormik/InteresFormik';
import { BrowserRouter, Route } from 'react-router-dom';
import { WithNotFound } from 'router/WithNotFound';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <WithNotFound>
        <Route path="/" element={<Interes />} />
        <Route path="/formik" element={<InteresFormik />} />
      </WithNotFound>
    </BrowserRouter>
  );
};

export default AppRouter;
