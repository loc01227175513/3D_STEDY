import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import viteCommonjs from 'vite-plugin-commonjs';

// https://vitejs.dev/config/
export default defineConfig(({ mode }: { mode: string }) => {
  // Load env file based on `mode` in the current directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  
  // Set NODE_ENV explicitly
  process.env.NODE_ENV = mode;

  return {
    plugins: [
      react({
        jsxImportSource: '@emotion/react',
        babel: {
          plugins: ['@emotion/babel-plugin']
        }
      }),
      viteCommonjs({
        filter: id => id.includes('node_modules') && 
                     (id.includes('@mui') || 
                      id.includes('@emotion') || 
                      id.includes('@apollo'))
      })
    ],
    build: {
      outDir: 'build',
      commonjsOptions: {
        transformMixedEsModules: true,
        include: [/node_modules/],
      },
      rollupOptions: {
        external: [
          'process',
        ],
        output: {
          manualChunks: {
            mui: ['@mui/material', '@mui/icons-material', '@mui/system', '@emotion/react', '@emotion/styled', '@mui/styled-engine'],
            vendor: ['react', 'react-dom', 'react-router-dom', 'react-is'],
          }
        }
      },
      // Increase warning limit to avoid large chunk warning
      chunkSizeWarningLimit: 1200,
    },
    define: {
      'process.env': env,
      '__DEV__': mode !== 'production',
      // Fix for MUI's global references
      'global': {},
    },
    optimizeDeps: {
      include: [
        '@mui/material',
        '@mui/icons-material',
        '@mui/system',
        '@mui/styled-engine',
        '@emotion/react',
        '@emotion/styled',
        '@emotion/cache',
        'tslib',
        '@apollo/client',
        '@apollo/client/link/error',
        '@apollo/client/link/context',
        '@apollo/client/utilities',
        'react-is'
      ],
      esbuildOptions: {
        target: 'es2020',
        jsx: 'automatic' as const,
        jsxImportSource: '@emotion/react',
      }
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        // Ensure tslib is properly resolved
        'tslib': resolve(__dirname, './node_modules/tslib/tslib.es6.js'),
        // Ensure react-is is properly resolved
        'react-is': resolve(__dirname, './node_modules/react-is/index.js'),
        // Explicitly alias styled engine paths
        '@mui/styled-engine': resolve(__dirname, './node_modules/@mui/styled-engine/index.js'),
        '@mui/styled-engine/StyledEngineProvider': resolve(__dirname, './node_modules/@mui/styled-engine/StyledEngineProvider/index.js'),
        '@mui/styled-engine/GlobalStyles': resolve(__dirname, './node_modules/@mui/styled-engine/GlobalStyles/index.js'),
        // Add specific fixes for internal functions
        '@emotion/cache/dist/emotion-cache.esm.js': resolve(__dirname, './node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js'),
        '@emotion/react/dist/emotion-react.esm.js': resolve(__dirname, './node_modules/@emotion/react/dist/emotion-react.browser.esm.js'),
        '@emotion/styled/dist/emotion-styled.esm.js': resolve(__dirname, './node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js'),
      },
      conditions: ['mui-modern', 'module', 'import', 'browser', 'default'],
      mainFields: ['browser', 'module', 'main']
    },
  };
});
