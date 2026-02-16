import {
  LoremUnit,
  LoremFormat,
  FORMAT_PLAIN,
  UNIT_PARAGRAPHS,
  UNIT_SENTENCES,
  UNIT_WORDS,
} from "./constants";
import { WORDS } from "./constants/words";
import { IPrng } from "./lib/generator";
import VeganIpsum from "./lib/VeganIpsum";

/**
 * Parameters for generating vegan ipsum text.
 */
export interface IVeganIpsumParams {
  /**
   * Number of units to generate (e.g., paragraphs, sentences, or words).
   * @default 1
   */
  count?: number;

  /**
   * Format of the generated text (e.g., plain text or HTML).
   * @default FORMAT_PLAIN
   */
  format?: LoremFormat;

  /**
   * Minimum number of sentences per paragraph.
   * @default 3
   */
  paragraphLowerBound?: number;

  /**
   * Maximum number of sentences per paragraph.
   * @default 7
   */
  paragraphUpperBound?: number;

  /**
   * Custom random number generator.
   */
  random?: IPrng;

  /**
   * Minimum number of words per sentence.
   * @default 5
   */
  sentenceLowerBound?: number;

  /**
   * Maximum number of words per sentence.
   * @default 15
   */
  sentenceUpperBound?: number;

  /**
   * Unit type for the generated text (e.g., paragraphs, sentences, or words).
   * @default UNIT_SENTENCES
   */
  units?: LoremUnit;

  /**
   * Custom word list to use for generating text.
   * @default WORDS
   */
  words?: string[];

  /**
   * Suffix to append to the generated text.
   * @default ""
   */
  suffix?: string;
}

/**
 * Generates vegan ipsum text based on the provided parameters.
 *
 * @param params - Configuration options for generating vegan ipsum text.
 * @returns Generated vegan ipsum text as a string.
 */
const veganIpsum = ({
  count = 1,
  random,
  format = FORMAT_PLAIN,
  paragraphLowerBound = 3,
  paragraphUpperBound = 7,
  sentenceLowerBound = 5,
  sentenceUpperBound = 15,
  units = UNIT_SENTENCES,
  words = WORDS,
  suffix = "",
}: IVeganIpsumParams = {}): string => {
  const options: {
    random?: IPrng;
    sentencesPerParagraph: { max: number; min: number };
    words: string[];
    wordsPerSentence: { max: number; min: number };
  } = {
    random,
    sentencesPerParagraph: {
      max: paragraphUpperBound,
      min: paragraphLowerBound,
    },
    words,
    wordsPerSentence: {
      max: sentenceUpperBound,
      min: sentenceLowerBound,
    },
  };

  const lorem: VeganIpsum = new VeganIpsum(options, format, suffix);

  switch (units) {
    case UNIT_PARAGRAPHS:
      return lorem.generateParagraphs(count);
    case UNIT_SENTENCES:
      return lorem.generateSentences(count);
    case UNIT_WORDS:
      return lorem.generateWords(count);
    default:
      return "";
  }
};

export { veganIpsum, VeganIpsum };
