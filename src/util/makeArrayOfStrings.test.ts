import { makeArrayOfStrings } from ".";

/**
 * Unit tests for the `makeArrayOfStrings` function.
 */
describe("makeArrayOfStrings", () => {
  /**
   * Helper function to generate a string.
   * @returns A constant string "string".
   */
  const makeStr = (): string => "string";

  /**
   * Test case: Given no length, it should return an empty array.
   */
  test("Given no length, it will return an empty array", () => {
    // Expect an empty array when the length is 0
    expect(makeArrayOfStrings(0, makeStr)).toEqual([]);
  });

  /**
   * Test case: Given a function to generate a string, it should return an array
   * with the generated string repeated the specified number of times.
   */
  test(`Given a function to make a string, it will return an array with
     the generated string repeated "x" times.`, () => {
    const results: string[] = makeArrayOfStrings(5, makeStr);
    // Expect the array to have a length of 5
    expect(results).toHaveLength(5);
    results.forEach((result) => {
      // Expect each element to equal the generated string
      expect(result).toEqual("string");
    });
  });
});
