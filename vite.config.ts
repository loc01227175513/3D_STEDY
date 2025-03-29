import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  console.log('Environment: ', env.VITE_NAME_ENV);
  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@public': path.resolve(__dirname, './public'),
      },
    },
    plugins: [react()],
    define: {
      'process.env': env,
    },
  };
});
