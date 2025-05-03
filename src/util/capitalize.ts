/**
 * Capitalizes the first character of a given string after trimming whitespace.
 *
 * @param str - The input string to capitalize.
 * @returns The input string with the first character capitalized.
 */
const capitalize = (str: string): string => {
  const trimmed = str.trim();
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
};

export default capitalize;
