import ProcessHelper from "../../test/util/ProcessHelper";
import { FORMAT_HTML, FORMAT_PLAIN, FORMATS } from "../constants/formats";
import { LINE_ENDINGS } from "../constants/lineEndings";
import { SUPPORTED_PLATFORMS } from "../constants/platforms";

import VeganIpsum from "./VeganIpsum";

/**
 * Unit tests for the `VeganIpsum` class.
 */
describe("VeganIpsum", () => {
  /**
   * Helper to mock and reset the platform during tests.
   */
  const process = new ProcessHelper();

  /**
   * Reset the platform to its original state after each test.
   */
  afterEach(() => process.resetPlatform());

  /**
   * Test case: Should throw an error if instantiated with an unsupported format.
   */
  test("Should throw an error if instantiated with an unsupported format", () => {
    try {
      // @ts-expect-error - Intentionally passing an invalid format
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const lorem = new VeganIpsum({}, "blade");
    } catch (error) {
      // Expect an error to be thrown with a specific message
      expect(error).toBeDefined();
      expect((error as Error).message).toEqual(
        `blade is an invalid format. Please use ${FORMATS.join(" or ")}.`
      );
    }
  });

  /**
   * Tests for the `getLineEnding` method.
   */
  describe("getLineEnding", () => {
    /**
     * Test case: Should return WIN32 line ending on WIN32 platform.
     */
    test("Should return WIN32 line ending on WIN32", () => {
      const lorem = new VeganIpsum();
      process.setPlatform(SUPPORTED_PLATFORMS.WIN32);
      expect(lorem.getLineEnding()).toEqual(LINE_ENDINGS.WIN32);
    });

    /**
     * Test case: Should return POSIX line ending on Mac or Linux platforms.
     */
    test("Should return POSIX line ending on Mac or Linux", () => {
      const lorem = new VeganIpsum();
      [SUPPORTED_PLATFORMS.DARWIN, SUPPORTED_PLATFORMS.LINUX].forEach((platform) => {
        process.setPlatform(platform);
        expect(lorem.getLineEnding()).toEqual(LINE_ENDINGS.POSIX);
      });
    });

    /**
     * Test case: Should return the custom suffix if it was set.
     */
    test("Should return the 'suffix' if it was set", () => {
      const lorem = new VeganIpsum({}, FORMAT_PLAIN, "*");
      expect(lorem.getLineEnding()).toEqual("*");
    });
  });

  /**
   * Tests for the `formatString` method.
   */
  describe("formatString", () => {
    const str: string = "string";

    /**
     * Test case: Should return the string by default.
     */
    test("Should return the string by default", () => {
      const lorem = new VeganIpsum();
      expect(lorem.formatString(str)).toEqual(str);
    });

    /**
     * Test case: Should return the string if the format is set to 'plain'.
     */
    test("Should return the string if the format is set to 'plain'", () => {
      const lorem = new VeganIpsum({}, FORMAT_PLAIN);
      expect(lorem.formatString(str)).toEqual(str);
    });

    /**
     * Test case: Should return the string wrapped in <p> tags if the format is set to 'html'.
     */
    test("Should return the string wrapped in p tags if the format is set to 'html'", () => {
      const lorem = new VeganIpsum({}, FORMAT_HTML);
      expect(lorem.formatString(str)).toEqual(`<p>${str}</p>`);
    });
  });

  /**
   * Tests for the `formatStrings` method.
   */
  describe("formatStrings", () => {
    const strings: string[] = ["string", "string-a", "string-b"];

    /**
     * Test case: Should return the strings by default.
     */
    test("Should return the string by default", () => {
      const lorem = new VeganIpsum();
      const results = lorem.formatStrings(strings);
      results.forEach((result, index) => {
        expect(result).toEqual(strings[index]);
      });
    });

    /**
     * Test case: Should return the strings if the format is set to 'plain'.
     */
    test("Should return the string if the format is set to 'plain'", () => {
      const lorem = new VeganIpsum({}, FORMAT_PLAIN);
      const results = lorem.formatStrings(strings);
      results.forEach((result, index) => {
        expect(result).toEqual(strings[index]);
      });
    });

    /**
     * Test case: Should return the strings wrapped in <p> tags if the format is set to 'html'.
     */
    test("Should return the string wrapped in p tags if the foramt is set to 'html'", () => {
      const lorem = new VeganIpsum({}, FORMAT_HTML);
      const results = lorem.formatStrings(strings);
      results.forEach((result, index) => {
        expect(result).toEqual(`<p>${strings[index]}</p>`);
      });
    });
  });

  /**
   * Tests for the `generateWords` method.
   */
  describe("generateWords", () => {
    /**
     * Test case: Should generate a specific number of words.
     */
    it("should generate a specific number of words", () => {
      const lorem = new VeganIpsum();
      const results = lorem.generateWords(7);
      const words = results.split(" ");
      expect(words).toHaveLength(7);
    });

    /**
     * Test case: Should generate a number of words between the min and max.
     */
    it("should generate a number of words between the min and max", () => {
      const max = 5;
      const min = 3;
      const lorem = new VeganIpsum({
        wordsPerSentence: { max, min },
      });
      for (let i = 0; i < 100; i++) {
        const results = lorem.generateWords();
        const words = results.split(" ");
        expect(words.length <= max).toEqual(true);
        expect(words.length >= min).toEqual(true);
      }
    });
  });

  /**
   * Tests for the `generateSentences` method.
   */
  describe("generateSentences", () => {
    /**
     * Test case: Should generate a specific number of sentences.
     */
    it("should generate a specific number of sentences", () => {
      const lorem = new VeganIpsum();
      const results = lorem.generateSentences(18);
      const sentences = results.split(". ");
      expect(sentences).toHaveLength(18);
    });

    /**
     * Test case: Should generate a number of sentences between the min and max.
     */
    it("should generate a number of sentences between the min and max", () => {
      const max = 19;
      const min = 16;
      const lorem = new VeganIpsum({
        sentencesPerParagraph: { max, min },
      });
      for (let i = 0; i < 100; i++) {
        const results = lorem.generateSentences();
        const sentences = results.split(". ");
        expect(sentences.length <= max).toEqual(true);
        expect(sentences.length >= min).toEqual(true);
      }
    });
  });

  /**
   * Tests for the `generateParagraphs` method.
   */
  describe("generateParagraphs", () => {
    /**
     * Test case: Should generate a specific number of paragraphs.
     */
    it("should generate a specific number of paragraphs", () => {
      process.setPlatform(SUPPORTED_PLATFORMS.WIN32);
      const lorem = new VeganIpsum();
      const results = lorem.generateParagraphs(3);
      const paragraphs = results.split(LINE_ENDINGS.WIN32);
      expect(paragraphs).toHaveLength(3);
    });
  });
});
