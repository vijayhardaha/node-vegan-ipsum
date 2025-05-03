import { SUPPORTED_PLATFORMS } from "../../constants/platforms";
import { COPY } from "../constants/commands";

import { getCopyCommand } from ".";

/**
 * Unit tests for the `getCopyCommand` function.
 */
describe("getCopyCommand", () => {
  /**
   * Test case: Should return the copy command for Mac OSX.
   */
  test("Should return the copy command for Mac OSX", () => {
    // Expect the copy command for Darwin (Mac OSX) to match the constant
    expect(getCopyCommand(SUPPORTED_PLATFORMS.DARWIN)).toEqual(COPY.DARWIN);
  });

  /**
   * Test case: Should return the copy command for Linux.
   */
  test("Should return the copy command for Linux", () => {
    // Expect the copy command for Linux to match the constant
    expect(getCopyCommand(SUPPORTED_PLATFORMS.LINUX)).toEqual(COPY.LINUX);
    // Expect the default copy command (when no platform is provided) to be for Linux
    expect(getCopyCommand()).toEqual(COPY.LINUX);
  });

  /**
   * Test case: Should return the copy command for Windows.
   */
  test("Should return the copy command for Windows", () => {
    // Expect the copy command for Windows to match the constant
    expect(getCopyCommand(SUPPORTED_PLATFORMS.WIN32)).toEqual(COPY.WIN32);
  });
});
