import { SUPPORTED_PLATFORMS } from "../constants";

import { isNode, isReactNative, isWindows } from ".";

/**
 * Unit tests for environment detection utilities.
 */
describe("environment utilities", () => {
  /**
   * Unit tests for the `isNode` function.
   */
  describe("isNode", () => {
    /**
     * Test case: Should return true if the code is executing in a Node.js environment.
     */
    test("returns true when running in Node.js", () => {
      // Expect `isNode` to return true when running in a Node.js environment
      expect(isNode()).toEqual(true);
    });
  });

  /**
   * Unit tests for the `isReactNative` function.
   */
  describe("isReactNative", () => {
    /**
     * Cache the original `navigator` object to restore it after each test.
     */
    const cachedNavigator: typeof global.navigator = global.navigator;

    /**
     * Helper function to mock the `navigator` object.
     * @param obj - The object to set as the global `navigator`.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const setNavigator = (obj: any): void => {
      global.navigator = obj;
    };

    /**
     * Restore the original `navigator` object after each test.
     */
    afterEach(() => setNavigator(cachedNavigator));

    /**
     * Test case: Should return false if not in a React Native environment.
     */
    test("returns false when not React Native", () => {
      // Simulate the absence of a `navigator` object
      setNavigator(undefined);
      expect(isReactNative()).toEqual(false);
    });

    /**
     * Test case: Should return true if in a React Native environment.
     */
    test("returns true when navigator.product === 'ReactNative'", () => {
      // Simulate a `navigator` object with `product` set to "ReactNative"
      setNavigator({ product: "ReactNative" });
      expect(isReactNative()).toEqual(true);
    });
  });

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
      Object.defineProperty(process, "platform", { value: platform });
    };

    /**
     * Restore the original `process.platform` after each test.
     */
    afterEach(() => setPlatform(cachedPlatform));

    /**
     * Test case: Should return false if not running on Windows.
     */
    test("returns false for non-Windows platform", () => {
      // Simulate a non-Windows platform (e.g., macOS)
      setPlatform(SUPPORTED_PLATFORMS.DARWIN);
      expect(isWindows()).toEqual(false);
    });

    /**
     * Test case: Should return true if running on Windows.
     */
    test("returns true for Windows platform", () => {
      // Simulate a Windows platform
      setPlatform(SUPPORTED_PLATFORMS.WIN32);
      expect(isWindows()).toEqual(true);
    });

    /**
     * Test case: Should return false if `process.platform` is undefined.
     */
    test("returns false when platform undefined", () => {
      // Simulate an undefined platform
      setPlatform(undefined);
      expect(isWindows()).toEqual(false);
    });
  });
});
