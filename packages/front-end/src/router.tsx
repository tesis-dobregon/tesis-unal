import { createBrowserRouter, redirect } from "react-router-dom";
import { PageLayout } from "./components";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import Sensors from "./pages/Sensors/Sensors";
import Alerts from "./pages/Alerts/Alerts";
import LoginPage, { loginAction, loginLoader } from "./pages/Login/Login";
import { fakeAuthProvider } from "./providers";

const router = createBrowserRouter([
  {
    element: <PageLayout />,
    loader({ request }) {
      // If the user is not logged in and tries to access any route under this Layout, we redirect
      // them to `/login` with a `from` parameter that allows login to redirect back
      // to this page upon successful authentication
      if (!fakeAuthProvider.isAuthenticated) {
        let params = new URLSearchParams();
        params.set("from", new URL(request.url).pathname);
        return redirect("/login?" + params.toString());
      }

      // Our root route always provides the user, if logged in
      return { user: fakeAuthProvider.username };
    },
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/sensores",
        element: <Sensors />,
      },
      {
        path: "/alertas",
        element: <Alerts />,
      },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "/login",
    action: loginAction,
    loader: loginLoader,
    element: <LoginPage />,
  },
]);

export default router;
