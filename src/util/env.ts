import { SUPPORTED_PLATFORMS } from "../constants";

/**
 * Determines if the current runtime environment is Node.js.
 *
 * @returns {boolean} `true` if the runtime is Node.js, otherwise `false`.
 */
export const isNode = (): boolean => {
  return typeof module !== "undefined" && !!module.exports;
};

/**
 * Determines if the current runtime environment is React Native.
 *
 * @returns {boolean} `true` if the runtime is React Native, otherwise `false`.
 */
export const isReactNative = (): boolean => {
  try {
    return (navigator as Navigator & { product?: string }).product === "ReactNative";
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return false;
  }
};

/**
 * Determines if the current runtime environment is Windows.
 *
 * @returns {boolean} `true` if the process is running on a Windows platform, otherwise `false`.
 */
export const isWindows = (): boolean => {
  try {
    return process.platform === SUPPORTED_PLATFORMS.WIN32;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return false;
  }
};

export default { isNode, isReactNative, isWindows };
