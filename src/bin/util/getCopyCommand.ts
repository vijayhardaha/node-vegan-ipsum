import { SUPPORTED_PLATFORMS } from "../../constants";
import { COPY } from "../constants/commands";

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

export default getCopyCommand;
