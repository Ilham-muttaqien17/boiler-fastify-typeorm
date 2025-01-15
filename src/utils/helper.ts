import type { AnyType } from '@src/types';

/**
 * Uppercase first char
 * @param val
 * @returns string
 */
export const ucFirst = (val: string): string => {
  return val.charAt(0).toUpperCase() + val.substring(1).toLowerCase();
};

/**
 * Parse to array
 * @param val - any
 * @returns Array
 */
export const toArray = <T extends AnyType = AnyType>(val: any, isAssign: boolean = false): T[] => {
  return Array.isArray(val) ? val : isAssign ? [val] : [];
};

/**
 * Remove properties from object
 * @param source - Source data in object
 * @param keys - Array of keys wants to delete
 * @returns Object
 */
export function omit<T extends Record<string, any>>(source: Record<string, any>, keys: (keyof T)[]) {
  return Object.keys(source).reduce((prev: Record<string, any>, curr) => {
    if (keys.indexOf(curr) === -1) {
      prev[curr] = source[curr];
    }

    return prev;
  }, {}) as T;
}
