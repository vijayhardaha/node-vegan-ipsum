import { exec } from "child_process";

import { getCopyCommand, getPlatform, isSupportedPlatform } from ".";

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
      return reject(error);
    }
  });
};

export default copyToClipboard;
