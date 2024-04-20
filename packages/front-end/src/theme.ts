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
          "&.MuiButton-containedPrimary": {
            backgroundColor: "black",
            color: "white",
            "&:hover": {
              backgroundColor: "black",
              color: "white",
            },
          },
          "&.MuiButton-outlinedPrimary": {
            color: "black",
            "&:hover": {
              color: "black",
            },
          },
        },
      },
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;
