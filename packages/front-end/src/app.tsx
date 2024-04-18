// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from "./app.module.scss";

import { Route, Routes, Link, RouterProvider } from "react-router-dom";
import { CssBaseline, Typography } from "@mui/material";
import router from "./router";

export function App() {
  return (
    <>
      <CssBaseline />
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
