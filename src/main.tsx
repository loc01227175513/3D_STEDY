import React, { StrictMode } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';
import theme from './common/themes.ts';

const AppJSX: React.JSX.Element = (
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>
);

createRoot(document.getElementById('root')!).render(AppJSX);
