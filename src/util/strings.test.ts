import { capitalize, rangeArray, makeArrayOfStrings } from ".";

/**
 * Unit tests for string and array generation utilities.
 */
describe("strings utilities", () => {
  /**
   * Unit tests for the `capitalize` function.
   */
  describe("capitalize", () => {
    /**
     * Test case: Given a string with a lowercase first letter, it should return
     * a new string with the first letter capitalized.
     */
    test("capitalizes first letter of a lowercase string", () => {
      // Expect "dog" to become "Dog"
      expect(capitalize("dog")).toEqual("Dog");
    });

    /**
     * Test case: Given a string with an uppercase first letter, it should
     * return the same string.
     */
    test("returns same string when first letter is uppercase", () => {
      // Expect "Dog" to remain "Dog"
      expect(capitalize("Dog")).toEqual("Dog");
      // Expect "DOG" to remain "DOG"
      expect(capitalize("DOG")).toEqual("DOG");
    });

    /**
     * Test case: Given an empty string, it should return an empty string.
     */
    test("returns empty string for empty input", () => {
      // Expect an empty string to remain an empty string
      expect(capitalize("")).toEqual("");
    });
  });

  /**
   * Unit tests for the `rangeArray` function.
   */
  describe("rangeArray", () => {
    /**
     * Test case: When no argument is provided, it should return an empty array.
     */
    test("returns empty array when no argument provided", () => {
      // Expect the function to return an empty array when no argument is passed
      expect(rangeArray()).toEqual([]);
    });

    /**
     * Test case: It should return an array of the specified size.
     */
    test("returns array of requested size", () => {
      const sizes = [1, 5, 7, 100];
      sizes.forEach((size, idx) => {
        // Expect the length of the returned array to match the specified size
        expect(rangeArray(size).length).toEqual(sizes[idx]);
      });
    });

    /**
     * Test case: Each element in the array should be equal to its index.
     */
    test("each element equals its index", () => {
      const results = rangeArray(5);
      results.forEach((result, index) => {
        // Expect each element to equal its index
        expect(result).toEqual(index);
      });
    });
  });

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
    test("returns empty array when length is 0", () => {
      // Expect an empty array when the length is 0
      expect(makeArrayOfStrings(0, makeStr)).toEqual([]);
    });

    /**
     * Test case: Given a function to generate a string, it should return an array
     * with the generated string repeated the specified number of times.
     */
    test("returns array with repeated generated strings", () => {
      const results = makeArrayOfStrings(5, makeStr);
      // Expect the array to have a length of 5
      expect(results).toHaveLength(5);
      // Expect each element to equal the generated string
      results.forEach((r) => expect(r).toEqual("string"));
    });
  });
});
