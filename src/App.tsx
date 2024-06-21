import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useAuthContext } from './authContext/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Auth/Login';
import Event from './pages/Event/Event';
import ErrorPage from './pages/ErrorPage';
import EventManager from './pages/Private/EventManager';

const App = () => {
  const { authenticated } = useAuthContext();

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Event />,
        },
        !authenticated ? { path: '/auth', element: <Login /> } : {},
        authenticated ? { path: '/manage', element: <EventManager /> } : {},
      ],
    },
    {
      path: '/*',
      element: (
        <Layout>
          <ErrorPage />
        </Layout>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
