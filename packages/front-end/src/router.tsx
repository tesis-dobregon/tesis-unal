import { createBrowserRouter } from "react-router-dom";
import PageLayout from "./components/Layouts/PageLayout";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import Sensors from "./pages/Sensors/Sensors";
import Alerts from "./pages/Alerts/Alerts";
import LoginPage from "./pages/Login/Login";

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
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default router;
