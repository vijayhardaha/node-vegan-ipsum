import { SUPPORTED_PLATFORMS } from "../constants/platforms";

/**
 * Determines if the current runtime environment is Windows.
 *
 * @returns {boolean} `true` if the process is running on a Windows platform, otherwise `false`.
 */
const isWindows = (): boolean => {
  let isWindowsResult: boolean = false;
  try {
    isWindowsResult = process.platform === SUPPORTED_PLATFORMS.WIN32;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    isWindowsResult = false;
  }
  return isWindowsResult;
};

export default isWindows;
