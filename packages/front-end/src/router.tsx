import { createBrowserRouter } from "react-router-dom";
import PageLayout from "./components/Layouts/PageLayout";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";

const router = createBrowserRouter([
  {
    element: <PageLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  { path: "sign-in", element: <SignIn /> },
]);

export default router;
