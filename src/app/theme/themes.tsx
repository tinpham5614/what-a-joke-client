"use client";

import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#4db6ac",
      light: "#80cbc4",
      dark: "#004d40",
      contrastText: "#fff",
    },
    secondary: {
      main: "#f50057",
    },
  },
});
darkTheme = responsiveFontSizes(darkTheme);

let lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#4db6ac",
      light: "#80cbc4",
      dark: "#004d40",
      contrastText: "#fff",
    },
    secondary: {
      main: "#f50057",
    },
  },
});
lightTheme = responsiveFontSizes(lightTheme);

export { darkTheme, lightTheme };
