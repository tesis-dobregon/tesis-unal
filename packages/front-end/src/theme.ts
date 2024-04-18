import { ThemeOptions, createTheme } from "@mui/material/styles";

export const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#25ff00",
    },
  },
  typography: {
    fontFamily: "Inter",
  },
};

const theme = createTheme(themeOptions);

export default theme;
