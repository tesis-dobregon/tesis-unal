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
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "currentColor", // Keep the same color as when the input is not focused
            },
          },
          "& .MuiInputLabel-root": {
            color: "currentColor", // Keep the label color the same as the text color
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "currentColor", // Keep the label color the same when focused
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "currentColor", // Keep the same color as when the input is not focused
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "currentColor",
          "&.Mui-focused": {
            color: "currentColor",
          },
        },
      },
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;
