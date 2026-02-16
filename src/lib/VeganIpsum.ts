import { FORMAT_HTML, FORMAT_PLAIN, FORMATS, LoremFormat } from "../constants/formats";
import { LINE_ENDINGS } from "../constants/lineEndings";
import { isNode, isReactNative, isWindows, fillArrayWith } from "../util";

import Generator, { IGeneratorOptions } from "./generator";

/**
 * A class for generating vegan ipsum text in various formats and units.
 */
class VeganIpsum {
  public generator: Generator;

  /**
   * Creates an instance of the `VeganIpsum` class.
   *
   * @param {IGeneratorOptions} options - Configuration options for the text generator.
   * @param {LoremFormat} format - The format of the generated text (e.g., plain or HTML).
   * @param {string} [suffix] - A custom line ending or suffix for the generated text.
   * @throws {Error} If the provided format is invalid.
   */
  constructor(
    options: IGeneratorOptions = {},
    public format: LoremFormat = FORMAT_PLAIN,
    public suffix?: string
  ) {
    if (FORMATS.indexOf(format.toLowerCase()) === -1) {
      throw new Error(`${format} is an invalid format. Please use ${FORMATS.join(" or ")}.`);
    }
    this.generator = new Generator(options);
  }

  /**
   * Determines the appropriate line ending based on the environment and suffix.
   *
   * @returns {string} The line ending to use.
   */
  public getLineEnding(): string {
    if (this.suffix) {
      return this.suffix;
    }

    if (!isReactNative() && isNode() && isWindows()) {
      return LINE_ENDINGS.WIN32;
    }

    return LINE_ENDINGS.POSIX;
  }

  /**
   * Formats a single string based on the specified format (e.g., wraps in HTML tags if needed).
   *
   * @param {string} str - The string to format.
   * @returns {string} The formatted string.
   */
  public formatString(str: string): string {
    if (this.format === FORMAT_HTML) {
      return `<p>${str}</p>`;
    }
    return str;
  }

  /**
   * Formats an array of strings based on the specified format.
   *
   * @param {string[]} strings - The array of strings to format.
   * @returns {string[]} The array of formatted strings.
   */
  public formatStrings(strings: string[]): string[] {
    return strings.map((str) => this.formatString(str));
  }

  /**
   * Generates a specified number of words and formats them.
   *
   * @param {number} [num] - The number of words to generate. If not provided, a random number is used.
   * @returns {string} A formatted string of generated words.
   */
  public generateWords(num?: number): string {
    return this.formatString(this.generator.generateRandomWords(num));
  }

  /**
   * Generates a specified number of sentences and formats them.
   *
   * @param {number} [num] - The number of sentences to generate. If not provided, a random number is used.
   * @returns {string} A formatted string of generated sentences.
   */
  public generateSentences(num?: number): string {
    return this.formatString(this.generator.generateRandomParagraph(num));
  }

  /**
   * Generates a specified number of paragraphs and formats them.
   *
   * @param {number} num - The number of paragraphs to generate.
   * @returns {string} A formatted string of generated paragraphs.
   */
  public generateParagraphs(num: number): string {
    const makeString = this.generator.generateRandomParagraph.bind(this.generator);
    return this.formatStrings(fillArrayWith(num, makeString)).join(this.getLineEnding());
  }
}

export default VeganIpsum;
