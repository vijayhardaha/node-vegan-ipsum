/**
 * Capitalizes the first character of a given string after trimming whitespace.
 *
 * @param {string} str - The input string to capitalize.
 * @returns {string} The input string with the first character capitalized.
 */
export const capitalize = (str: string): string => {
  const trimmed = str.trim();
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
};

/**
 * Creates an array of a specified length, where each element is its index.
 *
 * @param {number} length - The desired length of the array. Defaults to 0.
 * @returns {number[]} An array of indexes from 0 to `length - 1`.
 */
export const rangeArray = (length: number = 0): number[] => {
  return [...Array(length)].map((_: unknown, index: number): number => index);
};

/**
 * Creates an array of strings of a specified length, using a provided string generator function.
 *
 * @param {number} length - The desired length of the array.
 * @param {() => string} makeString - A function that generates a string for each element.
 * @returns {string[]} An array of strings of the specified length.
 */
export const fillArrayWith = (length: number, makeString: () => string): string[] => {
  const arr = rangeArray(length);
  return arr.map(() => makeString());
};

export default { capitalize, rangeArray, fillArrayWith };
