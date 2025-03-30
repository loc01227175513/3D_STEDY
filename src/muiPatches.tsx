/**
 * This file contains patches and workarounds for MUI-related issues
 */
import React from 'react';
import { ensureFunctionDefault } from './utils/exportHelper';

/**
 * Wrapper function to ensure that MUI functions work properly
 * when imported from bundles where default exports might get mangled
 */
export function patchedMuiFunction<T extends (...args: any[]) => any>(fn: T | { default: T } | undefined): T {
  // If the function is undefined, return a safe no-op function
  if (fn === undefined) {
    return ((() => {}) as unknown) as T;
  }
  
  return ensureFunctionDefault(fn);
}

/**
 * Patched version of the component provider 
 * Handles cases where default exports are incorrectly processed
 */
export function MuiSafeProvider({ children }: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  );
}

// Patch any specific components that are causing issues
// Add these as they are identified
export const patchedComponents = {
  // Add patched components here as needed
}; 