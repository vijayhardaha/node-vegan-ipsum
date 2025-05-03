import { capitalize } from ".";

/**
 * Unit tests for the `capitalize` function.
 */
describe("capitalize", () => {
  /**
   * Test case: Given a string with a lowercase first letter, it should return
   * a new string with the first letter capitalized.
   */
  test(`
    Given a string with a lowercase first letter, it should return a new string
    with the first letter upcased.
  `, () => {
    // Expect "dog" to become "Dog"
    expect(capitalize("dog")).toEqual("Dog");
  });

  /**
   * Test case: Given a string with an uppercase first letter, it should
   * return the same string.
   */
  test(`
    Given a string with an uppercase first letter, it should return the same
    string.
  `, () => {
    // Expect "Dog" to remain "Dog"
    expect(capitalize("Dog")).toEqual("Dog");
    // Expect "DOG" to remain "DOG"
    expect(capitalize("DOG")).toEqual("DOG");
  });

  /**
   * Test case: Given an empty string, it should return an empty string.
   */
  test("Given an empty string, it should return an empty string", () => {
    // Expect an empty string to remain an empty string
    expect(capitalize("")).toEqual("");
  });
});
