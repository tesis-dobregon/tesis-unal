import { RouterProvider } from "react-router-dom";
import { CssBaseline } from "@mui/material";
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
