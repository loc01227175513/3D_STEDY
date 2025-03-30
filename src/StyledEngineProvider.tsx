import React from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { ensureFunctionDefault } from './utils/exportHelper';
import { patchedMuiFunction } from './muiPatches';

// Create a custom cache instance with proper settings to make MUI work with Emotion
const cache = createCache({
  key: 'mui-style',
  prepend: true // This ensures MUI styles are loaded first
});

// Fix internal process styles function that might be mangled during bundling
const internal_processStyles = ensureFunctionDefault(
  (window as any).__EMOTION_STYLES_PROCESS__ || 
  ((styles: any) => styles)
);

// Patch the sheet insertion if it exists
if ((cache as any).sheet && (cache as any).sheet.insert) {
  const originalInsert = (cache as any).sheet.insert;
  (cache as any).sheet.insert = patchedMuiFunction(originalInsert);
}

export interface StyledEngineProviderProps {
  children: React.ReactNode;
}

// The StyledEngineProvider component will provide Emotion's cache to all MUI components
export function StyledEngineProvider({ children }: StyledEngineProviderProps) {
  return (
    <CacheProvider value={cache}>
      {children}
    </CacheProvider>
  );
} 