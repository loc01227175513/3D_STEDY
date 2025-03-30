import React from 'react';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { ensureFunctionDefault } from './utils/exportHelper';
import { patchedMuiFunction } from './muiPatches';

// Create a custom cache to fix emotion integration issues
const customCache = createCache({
  key: 'mui-style',
  prepend: true
});

// Fix the internal_processStyles function
const originalProcessStyles = (customCache as any).sheet?.processStyles;
(customCache as any).internal_processStyles = typeof originalProcessStyles === 'function' 
  ? ensureFunctionDefault(originalProcessStyles)
  : ((selector: string, styles: any) => styles);

// Also patch the sheet insertion function if needed
if ((customCache as any).sheet?.insert) {
  const originalInsert = (customCache as any).sheet.insert;
  (customCache as any).sheet.insert = patchedMuiFunction(originalInsert);
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