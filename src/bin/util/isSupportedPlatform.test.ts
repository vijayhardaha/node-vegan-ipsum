import { SUPPORTED_PLATFORMS } from "../../constants/platforms";

import { isSupportedPlatform } from ".";

/**
 * Unit tests for the `isSupportedPlatform` function.
 */
describe("isSupportedPlatform", () => {
  /**
   * Test case: Should return true if the platform is supported.
   */
  test("Should return true if the platform is supported", () => {
    // Iterate over all supported platforms and ensure the function returns true
    Object.values(SUPPORTED_PLATFORMS).forEach((platform: string) => {
      expect(isSupportedPlatform(platform)).toEqual(true);
    });
  });

  /**
   * Test case: Should return false if the platform is unsupported.
   */
  test("Should return false if the platform is unsupported", () => {
    // Test with an unsupported platform string
    expect(isSupportedPlatform("os2")).toEqual(false);
  });
});
