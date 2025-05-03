import { SUPPORTED_PLATFORMS } from "../constants/platforms";

import { isWindows } from ".";

describe("isWindows", () => {
  const cachedPlatform = process.platform;

  const setPlatform = (platform?: string) => {
    Object.defineProperty(process, "platform", {
      value: platform,
    });
  };

  afterEach(() => setPlatform(cachedPlatform));

  test("Should return false if not running on Windows", () => {
    setPlatform(SUPPORTED_PLATFORMS.DARWIN);
    expect(isWindows()).toEqual(false);
  });

  test("Should return true if running on Windows", () => {
    setPlatform(SUPPORTED_PLATFORMS.WIN32);
    expect(isWindows()).toEqual(true);
  });

  test("Should return true if running on undefined", () => {
    setPlatform(undefined);
    expect(isWindows()).toEqual(false);
  });
});
