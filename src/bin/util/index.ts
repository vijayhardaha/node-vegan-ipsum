import { exec } from "child_process";

import { version } from "../../../package.json";
import { SUPPORTED_PLATFORMS } from "../../constants";
import { COPY, CANNOT_DETERMINE_PLATFORM } from "../constants";

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

/**
 * Checks if the given platform is supported.
 *
 * @param {string} platform - The process platform (e.g., "darwin", "win32", "linux").
 * @returns {boolean} `true` if the platform is supported, otherwise `false`.
 */
const isSupportedPlatform = (platform: string): boolean => {
  return Object.values(SUPPORTED_PLATFORMS).indexOf(platform.toLowerCase()) !== -1;
};

/**
 * Retrieves the appropriate copy command for the specified platform.
 *
 * @param {string} platform - The process platform (e.g., "darwin", "win32", "linux").
 * @returns {string} The copy command for the specified platform.
 */
const getCopyCommand = (platform: string = ""): string => {
  switch (platform.toLowerCase()) {
    case SUPPORTED_PLATFORMS.DARWIN:
      return COPY.DARWIN;
    case SUPPORTED_PLATFORMS.WIN32:
      return COPY.WIN32;
    case SUPPORTED_PLATFORMS.LINUX:
    default:
      return COPY.LINUX;
  }
};

/**
 * Copies the provided text to the clipboard using the platform's native command.
 *
 * @param {string} text - The text to copy to the clipboard.
 * @returns {Promise<string>} A promise that resolves with the copied text, or rejects with an error.
 * @throws {Error} If the platform is not supported or if the copy command fails.
 */
const copyToClipboard = (text: string): Promise<string> => {
  return new Promise((resolve: (text: string) => void, reject: (error: Error) => void) => {
    try {
      const platform = getPlatform();
      if (isSupportedPlatform(platform) === false) {
        throw new Error(`Copy is not supported for ${platform}`);
      }
      const command = `echo "${text}" | ${getCopyCommand(platform)}`;
      exec(command, (error, stdout, stderr) => {
        if (error) {
          return reject(error);
        }

        if (stderr) {
          return reject(new Error(stderr));
        }

        return resolve(text);
      });
    } catch (error) {
      return reject(error as Error);
    }
  });
};

/**
 * Retrieves the current version of the package.
 *
 * @returns {string} The version of the package as defined in `package.json`.
 */
const getVersion = (): string => version;

export { copyToClipboard, getCopyCommand, getPlatform, getVersion, isSupportedPlatform };
