import { DependencyList, useCallback } from 'react';
import { debounce as lodashDebounce } from 'lodash';

import { FilterParams } from '../components/dashBoard/showFilter';

/**
 * Creates a debounced version of a function that delays invoking func until after wait milliseconds
 * have elapsed since the last time the debounced function was invoked.
 *
 * @param fn The function to debounce
 * @param wait The number of milliseconds to delay
 * @param deps The dependency array for useCallback
 * @returns A debounced version of the provided function
 */
export const useDebounce = <T extends (...args: unknown[]) => unknown>(
  fn: T,
  wait = 500,
  deps: DependencyList = []
) => {
  return useCallback(lodashDebounce(fn, wait), deps);
};

/**
 * Creates a debounced version of a function that takes a string parameter
 */
export const useStringDebounce = <T extends (value: string) => unknown>(
  fn: T,
  wait = 500,
  deps: DependencyList = []
) => {
  return useCallback(lodashDebounce(fn, wait), deps);
};

/**
 * Creates a debounced search function specifically for filtering data
 *
 * @param onFilterChange The callback function to handle filter changes
 * @param filterValues Current filter values
 * @param wait The number of milliseconds to delay
 * @returns A debounced search function
 */
export const useDebouncedSearch = (
  onFilterChange: ((filters: FilterParams) => void) | undefined,
  filterValues: FilterParams,
  wait = 500
) => {
  return useStringDebounce(
    (value: string) => {
      if (onFilterChange) {
        onFilterChange({
          ...filterValues,
          keyword: value,
        });
      }
    },
    wait,
    [filterValues, onFilterChange]
  );
};
