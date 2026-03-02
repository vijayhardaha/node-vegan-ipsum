import { WORDS } from "../constants/words";
import { capitalize, rangeArray } from "../util";

/**
 * Represents a range with minimum and maximum bounds.
 */
export interface Bounds {
	min: number;
	max: number;
}

/**
 * Type for a pseudo-random number generator function.
 */
export type Prng = () => number;

/**
 * Type for a seedable random number generator constructor.
 */
export type SeedRandom = new (seed?: string) => Prng;

/**
 * Interface for math utilities with a seedable random number generator.
 */
export interface Math {
	seedrandom: SeedRandom;
}

/**
 * Options for configuring the `Generator` class.
 */
export interface GeneratorOptions {
	/**
	 * Range for the number of sentences per paragraph.
	 */
	sentencesPerParagraph?: Bounds;

	/**
	 * Range for the number of words per sentence.
	 */
	wordsPerSentence?: Bounds;

	/**
	 * Custom random number generator function.
	 */
	random?: Prng;

	/**
	 * Custom word list to use for generating text.
	 */
	words?: string[];
}

/**
 * A class for generating random text (words, sentences, paragraphs).
 */
class Generator {
	public sentencesPerParagraph: Bounds;
	public wordsPerSentence: Bounds;
	public random: Prng;
	public words: string[];

	/**
	 * Creates an instance of the `Generator` class.
	 *
	 * @param {GeneratorOptions} options - Configuration options for the generator.
	 * @throws {Error} If the minimum exceeds the maximum in the provided bounds.
	 */
	constructor({
		sentencesPerParagraph = { max: 7, min: 3 },
		wordsPerSentence = { max: 15, min: 5 },
		random,
		words = WORDS,
	}: GeneratorOptions = {}) {
		if (sentencesPerParagraph.min > sentencesPerParagraph.max) {
			throw new Error(
				`Minimum number of sentences per paragraph (${
					sentencesPerParagraph.min
				}) cannot exceed maximum (${sentencesPerParagraph.max}).`
			);
		}

		if (wordsPerSentence.min > wordsPerSentence.max) {
			throw new Error(
				`Minimum number of words per sentence (${
					wordsPerSentence.min
				}) cannot exceed maximum (${wordsPerSentence.max}).`
			);
		}

		this.sentencesPerParagraph = sentencesPerParagraph;
		this.words = words;
		this.wordsPerSentence = wordsPerSentence;
		this.random = random || Math.random;
	}

	/**
	 * Generates a random integer between the specified minimum and maximum values.
	 *
	 * @param {number} min - The minimum value (inclusive).
	 * @param {number} max - The maximum value (inclusive).
	 * @returns {number} A random integer between `min` and `max`.
	 */
	public generateRandomInteger(min: number, max: number): number {
		return Math.floor(this.random() * (max - min + 1) + min);
	}

	/**
	 * Generates a random sequence of words.
	 *
	 * @param {number} [num] - The number of words to generate. If not provided, a random number is used.
	 * @returns {string} A string of randomly generated words.
	 */
	public generateRandomWords(num?: number): string {
		const { min, max } = this.wordsPerSentence;
		const length = num || this.generateRandomInteger(min, max);
		return rangeArray(length)
			.reduce((accumulator: string): string => {
				return `${this.pluckRandomWord()} ${accumulator}`;
			}, "")
			.trim();
	}

	/**
	 * Generates a random sentence.
	 *
	 * @param {number} [num] - The number of words in the sentence. If not provided, a random number is used.
	 * @returns {string} A randomly generated sentence.
	 */
	public generateRandomSentence(num?: number): string {
		return `${capitalize(this.generateRandomWords(num))}.`;
	}

	/**
	 * Generates a random paragraph.
	 *
	 * @param {number} [num] - The number of sentences in the paragraph. If not provided, a random number is used.
	 * @returns {string} A randomly generated paragraph.
	 */
	public generateRandomParagraph(num?: number): string {
		const { min, max } = this.sentencesPerParagraph;
		const length = num || this.generateRandomInteger(min, max);
		return rangeArray(length)
			.reduce((accumulator: string): string => {
				return `${this.generateRandomSentence()} ${accumulator}`;
			}, "")
			.trim();
	}

	/**
	 * Selects a random word from the word list.
	 *
	 * @returns {string} A randomly selected word.
	 */
	public pluckRandomWord(): string {
		const min = 0;
		const max = this.words.length - 1;
		const index = this.generateRandomInteger(min, max);
		return this.words[index];
	}
}

export default Generator;
