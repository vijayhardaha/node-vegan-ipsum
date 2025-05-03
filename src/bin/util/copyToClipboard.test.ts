/* tslint:disable-next-line:no-implicit-dependencies */
import nockExec from "nock-exec";

import ProcessHelper from "../../../test/util/ProcessHelper";
import { SUPPORTED_PLATFORMS } from "../../constants/platforms";
import { COPY } from "../constants/commands";

import { copyToClipboard } from ".";

/**
 * Unit tests for the `copyToClipboard` function.
 */
describe("copyToClipboard", () => {
  /**
   * Helper to mock and reset the platform during tests.
   */
  const process = new ProcessHelper();
  const str: string = "Some string";

  /**
   * Reset the platform to its original state after each test.
   */
  afterEach(() => process.resetPlatform());

  /**
   * Test case: Should throw an error if the platform is not supported.
   */
  it("should throw an error if the platform is not supported", (done) => {
    // Simulate an unsupported platform
    process.setPlatform("OS2");

    copyToClipboard(str).catch((error) => {
      // Expect an error to be thrown with a specific message
      expect(error).toBeDefined();
      expect(error.message).toEqual(`Copy is not supported for OS2`);
      done();
    });
  });

  /**
   * Test case: Should copy to the clipboard if the platform is supported.
   */
  it("should copy to the clipboard if the platform is supported", (done) => {
    // Simulate a supported platform (Windows)
    process.setPlatform(SUPPORTED_PLATFORMS.WIN32);

    // Mock the clipboard copy command
    nockExec(`echo "${str}" | ${COPY.WIN32}`).reply(0);

    copyToClipboard(str).then((result) => {
      // Expect the function to resolve with the input string
      expect(result).toEqual(str);
      done();
    });
  });

  /**
   * Test case: Should throw an error if the copy command fails.
   */
  it("should throw an error if the copy command does not work", (done) => {
    const errorMessage: string = "Something went wrong.";
    // Simulate a supported platform (Windows)
    process.setPlatform(SUPPORTED_PLATFORMS.WIN32);

    // Mock the clipboard copy command to simulate an error
    nockExec(`echo "${str}" | ${COPY.WIN32}`).err(errorMessage).reply(0);

    copyToClipboard(str).catch((error) => {
      // Expect an error to be thrown with the mocked error message
      expect(error).toBeDefined();
      expect(error.message).toEqual(errorMessage);
      done();
    });
  });
});
