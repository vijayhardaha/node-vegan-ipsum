import { SUPPORTED_PLATFORMS } from "../constants/platforms";

import { isWindows } from ".";

/**
 * Unit tests for the `isWindows` function.
 */
describe("isWindows", () => {
  /**
   * Cache the original `process.platform` to restore it after each test.
   */
  const cachedPlatform: NodeJS.Platform = process.platform;

  /**
   * Helper function to mock the `process.platform` value.
   * @param platform - The platform string to set as `process.platform`.
   */
  const setPlatform = (platform?: string): void => {
    Object.defineProperty(process, "platform", {
      value: platform,
    });
  };

  /**
   * Restore the original `process.platform` after each test.
   */
  afterEach(() => setPlatform(cachedPlatform));

  /**
   * Test case: Should return false if not running on Windows.
   */
  test("Should return false if not running on Windows", () => {
    // Simulate a non-Windows platform (e.g., macOS)
    setPlatform(SUPPORTED_PLATFORMS.DARWIN);
    expect(isWindows()).toEqual(false);
  });

  /**
   * Test case: Should return true if running on Windows.
   */
  test("Should return true if running on Windows", () => {
    // Simulate a Windows platform
    setPlatform(SUPPORTED_PLATFORMS.WIN32);
    expect(isWindows()).toEqual(true);
  });

  /**
   * Test case: Should return false if `process.platform` is undefined.
   */
  test("Should return true if running on undefined", () => {
    // Simulate an undefined platform
    setPlatform(undefined);
    expect(isWindows()).toEqual(false);
  });
});
