/**
 * A utility function to help with handling default exports
 * This provides a workaround for the "f$.default is not a function" error
 */
export function ensureFunctionDefault<T extends Function>(fn: T | { default: T }): T {
  if (typeof fn === 'function') {
    return fn;
  }
  
  if (fn && typeof fn === 'object' && typeof fn.default === 'function') {
    return fn.default;
  }
  
  // If we can't find a function, return a no-op function to prevent crashes
  return ((() => {}) as unknown) as T;
}

/**
 * Safely access object properties, avoiding "cannot read property of undefined" errors
 */
export function safeAccess<T, K extends keyof T>(obj: T | undefined | null, key: K): T[K] | undefined {
  if (!obj) return undefined;
  return obj[key];
}

/**
 * Forces the export of a module to be treated as a default export
 * Useful for fixing module interop issues
 */
export function asDefaultExport<T>(module: T | { default: T }): T {
  if (module && typeof module === 'object' && 'default' in module) {
    return module.default;
  }
  return module;
} 