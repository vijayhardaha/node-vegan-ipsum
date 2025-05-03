import { isNode } from ".";

/**
 * Unit tests for the `isNode` function.
 */
describe("isNode", () => {
  /**
   * Test case: Should return true if the code is executing in a Node.js environment.
   */
  test("should return true if executing in NodeJS", () => {
    // Expect `isNode` to return true when running in a Node.js environment
    expect(isNode()).toEqual(true);
  });
});
