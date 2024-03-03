"use client";

import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#4db6ac",
      // main: '#1976d2',
      light: "#80cbc4",
      dark: "#004d40",
      // contrastText: "#fff",
    },
    secondary: {
      main: "#f50057",
    },
  },
});
darkTheme = responsiveFontSizes(darkTheme);

export default darkTheme;
