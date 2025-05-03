import { isReactNative } from "./";

/**
 * Unit tests for the `isReactNative` function.
 */
describe("isReactNative", () => {
  /**
   * Cache the original `navigator` object to restore it after each test.
   */
  // @ts-ignore
  const cachedNavigator: typeof global.navigator = global.navigator;

  /**
   * Helper function to mock the `navigator` object.
   * @param obj - The object to set as the global `navigator`.
   */
  const setNavigator = (obj: any): void => {
    // @ts-ignore
    global.navigator = obj;
  };

  /**
   * Restore the original `navigator` object after each test.
   */
  afterEach(() => {
    setNavigator(cachedNavigator);
  });

  /**
   * Test case: Should return false if not in a React Native environment.
   */
  test("should return false if not in React Native", () => {
    // Simulate the absence of a `navigator` object
    setNavigator(undefined);
    expect(isReactNative()).toEqual(false);
  });

  /**
   * Test case: Should return true if in a React Native environment.
   */
  test("should return true if in React Native", () => {
    // Simulate a `navigator` object with `product` set to "ReactNative"
    setNavigator({ product: "ReactNative" });
    expect(isReactNative()).toEqual(true);
  });
});
