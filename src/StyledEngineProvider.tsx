import React from 'react';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

// Create a custom cache to fix emotion integration issues
const customCache = createCache({
  key: 'mui-style',
  prepend: true
});

// Polyfill for internal_processStyles if needed
if (!('internal_processStyles' in customCache)) {
  // Define a simple implementation if missing
  (customCache as any).internal_processStyles = (selector: string, styles: any) => {
    return styles;
  };
}

interface StyledEngineProviderProps {
  children: React.ReactNode;
}

// Create a wrapper component to inject the cache
export default function StyledEngineProvider({ children }: StyledEngineProviderProps) {
  return (
    <CacheProvider value={customCache}>
      {children}
    </CacheProvider>
  );
} 