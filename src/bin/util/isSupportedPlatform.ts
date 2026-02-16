import { SUPPORTED_PLATFORMS } from "../../constants";

/**
 * Checks if the given platform is supported.
 *
 * @param {string} platform - The process platform (e.g., "darwin", "win32", "linux").
 * @returns {boolean} `true` if the platform is supported, otherwise `false`.
 */
const isSupportedPlatform = (platform: string): boolean => {
  return Object.values(SUPPORTED_PLATFORMS).indexOf(platform.toLowerCase()) !== -1;
};

export default isSupportedPlatform;
