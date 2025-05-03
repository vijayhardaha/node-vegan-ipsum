import makeArrayOfLength from "./makeArrayOfLength";

/**
 * Creates an array of strings of a specified length, using a provided string generator function.
 *
 * @param {number} length - The desired length of the array.
 * @param {() => string} makeString - A function that generates a string for each element.
 * @returns {string[]} An array of strings of the specified length.
 */
const makeArrayOfStrings = (length: number, makeString: () => string): string[] => {
  const arr = makeArrayOfLength(length);
  return arr.map(() => makeString());
};

export default makeArrayOfStrings;
