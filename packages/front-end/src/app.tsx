// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from "./app.module.scss";

import { Route, Routes, Link, RouterProvider } from "react-router-dom";
import { CssBaseline, Typography } from "@mui/material";
import router from "./router";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";

export function App() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
