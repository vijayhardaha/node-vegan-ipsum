import { SUPPORTED_PLATFORMS } from "../../constants";
import { CANNOT_DETERMINE_PLATFORM } from "../constants/errors";

import { getPlatform } from ".";

/**
 * Unit tests for the `getPlatform` function.
 */
describe("getPlatform", () => {
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
  afterEach(() => {
    setPlatform(cachedPlatform);
  });

  /**
   * Test case: Should throw an error if it cannot determine the platform.
   */
  test("Should throw an error if it cannot determine the platform", () => {
    // Simulate an undefined platform
    setPlatform();
    try {
      getPlatform();
    } catch (error) {
      // Expect an error to be thrown with a specific message
      expect(error).toBeDefined();
      expect((error as Error).message).toEqual(CANNOT_DETERMINE_PLATFORM);
    }
  });

  /**
   * Test case: Should return the platform if it is supported.
   */
  test("Should return the platform", () => {
    // Iterate over all supported platforms and ensure the function returns the correct platform
    Object.values(SUPPORTED_PLATFORMS).forEach((platform: string) => {
      setPlatform(platform);
      expect(getPlatform()).toEqual(platform);
    });
  });
});
