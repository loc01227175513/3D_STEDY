import React, { StrictMode } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';
import theme from './common/themes.ts';
import { StyledEngineProvider } from './StyledEngineProvider.tsx';

const AppJSX: React.JSX.Element = (
  <StrictMode>
    <StyledEngineProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </StyledEngineProvider>
  </StrictMode>
);

createRoot(document.getElementById('root')!).render(AppJSX);
