import { makeArrayOfLength } from ".";

/**
 * Unit tests for the `makeArrayOfLength` function.
 */
describe("makeArrayOfLength", () => {
  /**
   * Test case: When no argument is provided, it should return an empty array.
   */
  test("When given no argument, it should return an array of zero size", () => {
    // Expect the function to return an empty array when no argument is passed
    expect(makeArrayOfLength()).toEqual([]);
  });

  /**
   * Test case: It should return an array of the specified size.
   */
  test("It should return an array of the given size", () => {
    const sizes: number[] = [1, 5, 7, 100];
    sizes.forEach((size, index) => {
      // Expect the length of the returned array to match the specified size
      expect(makeArrayOfLength(size).length).toEqual(sizes[index]);
    });
  });

  /**
   * Test case: Each element in the array should be equal to its index.
   */
  test("Each element in the array should be the index", () => {
    const results: number[] = makeArrayOfLength(5);
    results.forEach((result, index) => {
      // Expect each element to equal its index
      expect(result).toEqual(index);
    });
  });
});
