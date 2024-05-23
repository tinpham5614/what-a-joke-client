"use client";

import React, { createContext, useMemo, useState, useContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { lightTheme, darkTheme } from './themes';

// Create a context to store the theme mode and the function to toggle it
const ThemeContext = createContext({
  mode: 'light',
  toggleTheme: () => {},
});

// Create a custom hook to consume the context
export const useThemeContext = () => useContext(ThemeContext);

// Create a provider to wrap the app in the theme context
const ThemeContextProvider = ({ children } : { children: React.ReactNode }) => {
  const [mode, setMode] = useState('light');

  // Function to toggle the theme mode
  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // Create a theme object based on the current mode
  const theme = useMemo(() => {
    return createTheme(mode === 'light' ? lightTheme : darkTheme);
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
