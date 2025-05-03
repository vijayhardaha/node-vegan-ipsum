import { version } from "../../../package.json";

/**
 * Retrieves the current version of the package.
 *
 * @returns {string} The version of the package as defined in `package.json`.
 */
const getVersion = (): string => version;

export default getVersion;
