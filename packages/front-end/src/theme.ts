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
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "black",
          "&:hover": {
            backgroundColor: "black",
          },
        },
      },
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;
