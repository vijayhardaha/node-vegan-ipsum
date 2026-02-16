/**
 * Creates an array of a specified length, where each element is its index.
 *
 * @param {number} length - The desired length of the array. Defaults to 0.
 * @returns {number[]} An array of indexes from 0 to `length - 1`.
 */
const makeArrayOfLength = (length: number = 0): number[] => {
  return [...Array(length)].map((_: unknown, index: number): number => index);
};

export default makeArrayOfLength;
