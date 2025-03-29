import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: false;
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true;
    tablet: true;
    desktop: true;
  }
}

const theme = createTheme({
  typography: {
    fontFamily: 'century-gothic, sans-serif',
  },
  palette: {
    primary: {
      main: '#556cd6',
      light: '#757ce8',
      dark: '#002884',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    mode: 'light',
  },
  breakpoints: {
    values: {
      mobile: 320,
      tablet: 768,
      desktop: 1024,
    },
  },
  zIndex: {
    modal: 99999999,
    tooltip: 99999999,
  },
});

export default theme;
