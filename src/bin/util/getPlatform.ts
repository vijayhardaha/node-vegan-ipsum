import { CANNOT_DETERMINE_PLATFORM } from "../constants/errors";

/**
 * Retrieves the current process platform.
 *
 * @returns {string} The process platform (e.g., "darwin", "win32", "linux").
 * @throws {Error} If the platform cannot be determined.
 */
const getPlatform = (): string => {
  if (!process || typeof process.platform !== "string") {
    throw new Error(CANNOT_DETERMINE_PLATFORM);
  }

  return process.platform;
};

export default getPlatform;
