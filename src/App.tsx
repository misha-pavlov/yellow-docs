import { createBrowserRouter, defer, RouterProvider } from 'react-router-dom';
import 'antd/dist/reset.css';
import { constants } from './config';
import { ErrorPage, Home, Login, Root } from './pages';
import { getUserData } from './pages/Root/helpers';

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
  // example router with id
  // {
  //   path: "contacts/:contactId",
  //   element: <Example />,
  //   errorElement: <ErrorPage />,
  // },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
