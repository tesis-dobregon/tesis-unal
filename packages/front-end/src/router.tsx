import { createBrowserRouter } from "react-router-dom";
import PageLayout from "./components/Layouts/PageLayout";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import NotFound from "./pages/NotFound/NotFound";
import Sensors from "./pages/Sensors/Sensors";
import Alerts from "./pages/Alerts/Alerts";
import LoginPage from "./components/Login/login";

const router = createBrowserRouter([
  {
    element: <PageLayout />,
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
      {
        path: "/login",
        element: <LoginPage />,
      },
      { path: "*", element: <NotFound /> },
    ],
  },
  { path: "sign-in", element: <SignIn /> },
]);

export default router;
