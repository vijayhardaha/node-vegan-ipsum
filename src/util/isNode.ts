/**
 * Determines if the current runtime environment is Node.js.
 *
 * @returns {boolean} `true` if the runtime is Node.js, otherwise `false`.
 */
const isNode = (): boolean => {
  return typeof module !== "undefined" && !!module.exports;
};

export default isNode;
