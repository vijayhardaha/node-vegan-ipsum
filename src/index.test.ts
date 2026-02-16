import ProcessHelper from "../test/util/ProcessHelper";

import { LINE_ENDINGS } from "./constants/lineEndings";
import { SUPPORTED_PLATFORMS } from "./constants/platforms";
import { LoremUnit, UNIT_PARAGRAPHS, UNIT_SENTENCES, UNIT_WORDS } from "./constants/units";

import { veganIpsum } from ".";

describe("veganIpsum", () => {
  const process = new ProcessHelper();

  /**
   * Resets the platform after each test to ensure a clean environment.
   */
  afterEach(() => process.resetPlatform());

  /**
   * Tests that the default behavior of `veganIpsum` generates one sentence.
   */
  test("Should return one sentence by default", () => {
    const result = veganIpsum();
    expect(result.slice(-1)).toEqual(".");

    const sentences = result.split(". ");
    expect(sentences).toHaveLength(1);
  });

  /**
   * Tests that `veganIpsum` generates the specified number of paragraphs
   * when the `units` parameter is set to `UNIT_PARAGRAPHS`.
   */
  test("Should return the specified number of paragraphs", () => {
    process.setPlatform(SUPPORTED_PLATFORMS.WIN32);
    const count = 5;
    const someUnits: LoremUnit[] = [UNIT_PARAGRAPHS];
    someUnits.forEach((units) => {
      const results = veganIpsum({ count, units });
      const paragraphs = results.split(LINE_ENDINGS.WIN32);
      expect(paragraphs).toHaveLength(count);
    });
  });

  /**
   * Tests that `veganIpsum` generates the specified number of sentences
   * when the `units` parameter is set to `UNIT_SENTENCES`.
   */
  test("Should return the specified number of sentences", () => {
    const count = 3;
    const someUnits: LoremUnit[] = [UNIT_SENTENCES];
    someUnits.forEach((units) => {
      const results = veganIpsum({ count, units });
      const sentences = results.split(". ");
      expect(sentences).toHaveLength(count);
    });
  });

  /**
   * Tests that `veganIpsum` generates the specified number of words
   * when the `units` parameter is set to `UNIT_WORDS`.
   */
  test("Should return the specified number of words", () => {
    const count = 7;
    const someUnits: LoremUnit[] = [UNIT_WORDS];
    someUnits.forEach((units) => {
      const results = veganIpsum({ count, units });
      const words = results.split(" ");
      expect(words).toHaveLength(count);
    });
  });

  /**
   * Tests that `veganIpsum` returns an empty string when an invalid `units` parameter is provided.
   */
  test("Should return an empty string for invalid units", () => {
    // @ts-expect-error Testing invalid units
    expect(veganIpsum({ count: 7, units: "unknown" })).toEqual("");
  });
});
