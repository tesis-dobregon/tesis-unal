import { createBrowserRouter, redirect } from 'react-router-dom';
import { PageLayout } from './components';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import LoginPage, { loginAction, loginLoader } from './pages/Login/Login';
import { authProvider } from './providers';
import { SensorsPage } from './pages/Sensors';
import { AlertsPage } from './pages/Alerts';

const router = createBrowserRouter([
  {
    element: <PageLayout />,
    loader({ request }) {
      // If the user is not logged in and tries to access any route under this Layout, we redirect
      // them to `/login` with a `from` parameter that allows login to redirect back
      // to this page upon successful authentication
      if (!authProvider.isAuthenticated) {
        const params = new URLSearchParams();
        params.set('from', new URL(request.url).pathname);
        return redirect('/login?' + params.toString());
      }

      // Our root route always provides the user, if logged in
      return { user: authProvider.username };
    },
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/sensores',
        element: <SensorsPage />,
      },
      {
        path: '/alertas',
        element: <AlertsPage />,
      },
      { path: '*', element: <NotFound /> },
    ],
  },
  {
    path: '/login',
    action: loginAction,
    loader: loginLoader,
    element: <LoginPage />,
  },
  {
    path: '/logout',
    async action() {
      // We signout in a "resource route" that we can hit from a fetcher.Form
      await authProvider.signout();
      return redirect('/');
    },
  },
]);

export default router;
