import fs from "fs";

import { getVersion } from ".";

// Parse the `package.json` file to retrieve its contents
const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));

/**
 * Unit tests for the `getVersion` function.
 */
describe("getVersion", () => {
  /**
   * Test case: Should return the version from `package.json`.
   */
  test("Returns the version from package.json", () => {
    // Expect the function to return the version field from `package.json`
    expect(getVersion()).toEqual(pkg.version);
  });
});
