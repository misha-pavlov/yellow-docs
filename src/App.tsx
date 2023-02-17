import { createBrowserRouter, defer, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'antd/dist/reset.css';
import { constants } from './config';
import { ErrorPage, Home, Login, Root, Document } from './pages';
import { getUserData } from './pages/Root/helpers';
import { store } from './store';

const router = createBrowserRouter([
  {
    path: constants.routes.Root,
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: () => defer({ userPromise: getUserData() }),
  },
  {
    path: constants.routes.Home,
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: constants.routes.Login,
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: `${constants.routes.Document}/:documentId`,
    element: <Document />,
    errorElement: <ErrorPage />,
  },
]);

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
