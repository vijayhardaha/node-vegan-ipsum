import fs from 'fs';

import nockExec from 'nock-exec';

import { COPY, CANNOT_DETERMINE_PLATFORM } from './constants';
import { copyToClipboard, getCopyCommand, getPlatform, getVersion, isSupportedPlatform } from './utils';
import ProcessHelper from '../../../tests/util/ProcessHelper';
import { SUPPORTED_PLATFORMS } from '../../constants';

// Parse the `package.json` file to retrieve its contents
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

/**
 * Unit tests for CLI utility helpers verifying clipboard, platform detection,
 * and version behaviors under simulated environments.
 */
describe('bin util functions', () => {
  /**
   * Tests for `copyToClipboard`.
   */
  describe('copyToClipboard', () => {
    /**
     * Helper to mock and reset the platform during tests.
     */
    const process = new ProcessHelper();

    // Define a sample string to be used in clipboard tests
    const str: string = 'Some string';

    /**
     * Reset the platform to its original state after each test.
     */
    afterEach(() => {
      process.resetPlatform();
    });

    /**
     * Test case: Should throw an error if the platform is not supported.
     */
    test('should throw an error if the platform is not supported', () => {
      // Simulate an unsupported platform
      process.setPlatform('OS2');

      copyToClipboard(str).catch((error) => {
        // Expect an error to be thrown with a specific message
        expect(error).toBeDefined();
        expect(error.message).toEqual(`Copy is not supported for OS2`);
      });
    });

    /**
     * Test case: Should copy to the clipboard if the platform is supported.
     */
    test('should copy to the clipboard if the platform is supported', () => {
      // Simulate a supported platform (Windows)
      process.setPlatform(SUPPORTED_PLATFORMS.WIN32);

      // Mock the clipboard copy command
      nockExec(`echo "${str}" | ${COPY.WIN32}`).reply(0);

      copyToClipboard(str).then((result) => {
        // Expect the function to resolve with the input string
        expect(result).toEqual(str);
      });
    });

    /**
     * Test case: Should throw an error if the copy command fails.
     */
    test('should throw an error if the copy command does not work', () => {
      const errorMessage: string = 'Something went wrong.';
      // Simulate a supported platform (Windows)
      process.setPlatform(SUPPORTED_PLATFORMS.WIN32);

      // Mock the clipboard copy command to simulate an error
      nockExec(`echo "${str}" | ${COPY.WIN32}`).err(errorMessage).reply(0);

      copyToClipboard(str).catch((error) => {
        // Expect an error to be thrown with the mocked error message
        expect(error).toBeDefined();
        // Expect the error message to match the mocked error message from nockExec
        expect(error.message).toEqual(errorMessage);
      });
    });

    /**
     * Test case: Should reject when exec callback receives an error.
     * This simulates a failure in the underlying system command used for copying to the clipboard.
     */
    test('rejects when exec callback receives an error', async () => {
      process.setPlatform(SUPPORTED_PLATFORMS.WIN32);

      // Mock exec for this test
      const execMock = vi.fn();
      vi.doMock('child_process', () => ({ exec: execMock }));

      // clear module cache
      vi.resetModules();

      const callbackError = new Error('exec failed');
      execMock.mockImplementation(
        (_command: string, callback: (error: Error | null, stdout: string, stderr: string) => void) => {
          callback(callbackError, '', '');
          return undefined;
        }
      );

      const { copyToClipboard } = await import('./utils');

      await expect(copyToClipboard('Some string')).rejects.toBe(callbackError);
    });
  });

  /**
   * Tests for `getCopyCommand`.
   */
  describe('getCopyCommand', () => {
    /**
     * Test case: Should return the copy command for Mac OSX.
     */
    test('Should return the copy command for Mac OSX', () => {
      // Expect the copy command for Darwin (Mac OSX) to match the constant
      expect(getCopyCommand(SUPPORTED_PLATFORMS.DARWIN)).toEqual(COPY.DARWIN);
    });

    /**
     * Test case: Should return the copy command for Linux.
     */
    test('Should return the copy command for Linux', () => {
      // Expect the copy command for Linux to match the constant
      expect(getCopyCommand(SUPPORTED_PLATFORMS.LINUX)).toEqual(COPY.LINUX);
      // Expect the default copy command (when no platform is provided) to be for Linux
      expect(getCopyCommand()).toEqual(COPY.LINUX);
    });

    /**
     * Test case: Should return the copy command for Windows.
     */
    test('Should return the copy command for Windows', () => {
      // Expect the copy command for Windows to match the constant
      expect(getCopyCommand(SUPPORTED_PLATFORMS.WIN32)).toEqual(COPY.WIN32);
    });
  });

  /**
   * Tests for `getPlatform`.
   */
  describe('getPlatform', () => {
    /**
     * Use the shared ProcessHelper to mock and restore `process.platform`.
     */
    const process = new ProcessHelper();

    /**
     * Reset the platform to its original state after each test to avoid side effects.
     */
    afterEach(() => {
      process.resetPlatform();
    });

    /**
     * Test case: Should throw an error if it cannot determine the platform.
     */
    test('Should throw an error if it cannot determine the platform', () => {
      // Simulate an undefined platform
      process.setPlatform();
      try {
        getPlatform();
      } catch (error) {
        // Expect an error to be thrown with a specific message
        expect(error).toBeDefined();
        // Expect the error message to indicate that the platform cannot be determined
        expect((error as Error).message).toEqual(CANNOT_DETERMINE_PLATFORM);
      }
    });

    /**
     * Test case: Should return the platform if it is supported.
     */
    test('Should return the platform', () => {
      // Iterate over all supported platforms and ensure the function returns the correct platform
      Object.values(SUPPORTED_PLATFORMS).forEach((platform: string) => {
        process.setPlatform(platform);
        // Expect the function to return the correct platform for each supported platform
        expect(getPlatform()).toEqual(platform);
      });
    });
  });

  /**
   * Tests for `getVersion`.
   */
  describe('getVersion', () => {
    /**
     * Test case: Should return the version from `package.json`.
     */
    test('Returns the version from package.json', () => {
      // Expect the function to return the version field from `package.json`
      expect(getVersion()).toEqual(pkg.version);
    });
  });

  /**
   * Tests for `isSupportedPlatform`.
   */
  describe('isSupportedPlatform', () => {
    /**
     * Test case: Should return true if the platform is supported.
     */
    test('Should return true if the platform is supported', () => {
      // Iterate over all supported platforms and ensure the function returns true
      Object.values(SUPPORTED_PLATFORMS).forEach((platform: string) => {
        // Expect the function to return true for each supported platform
        expect(isSupportedPlatform(platform)).toEqual(true);
      });
    });

    /**
     * Test case: Should return false if the platform is unsupported.
     */
    test('Should return false if the platform is unsupported', () => {
      // Expect the function to return false for an unsupported platform
      expect(isSupportedPlatform('os2')).toEqual(false);
    });
  });
});
