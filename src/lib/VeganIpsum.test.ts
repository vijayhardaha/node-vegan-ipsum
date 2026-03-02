import ProcessHelper from "../../tests/util/ProcessHelper";
import {
	FORMAT_HTML,
	FORMAT_PLAIN,
	FORMATS,
	LINE_ENDINGS,
	SUPPORTED_PLATFORMS,
} from "../constants";

import VeganIpsum from "./VeganIpsum";

/**
 * Unit tests for the VeganIpsum class covering formatting, generation,
 * and platform-specific behavior across typical usage scenarios.
 */
describe("VeganIpsum", () => {
	// Helper to mock and reset the platform during tests.
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
			// Expect the error message to indicate the invalid format and list supported formats
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
			// Expect the line ending to be WIN32 when the platform is set to WIN32
			expect(lorem.getLineEnding()).toEqual(LINE_ENDINGS.WIN32);
		});

		/**
		 * Test case: Should return POSIX line ending on Mac or Linux platforms.
		 */
		test("Should return POSIX line ending on Mac or Linux", () => {
			const lorem = new VeganIpsum();
			[SUPPORTED_PLATFORMS.DARWIN, SUPPORTED_PLATFORMS.LINUX].forEach(
				(platform) => {
					process.setPlatform(platform);
					// Expect the line ending to be POSIX when the platform is set to Darwin or Linux
					expect(lorem.getLineEnding()).toEqual(LINE_ENDINGS.POSIX);
				}
			);
		});

		/**
		 * Test case: Should return the custom suffix if it was set.
		 */
		test("Should return the 'suffix' if it was set", () => {
			const lorem = new VeganIpsum({}, FORMAT_PLAIN, "*");
			// Expect the line ending to be the custom suffix when it is set in the constructor
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
			// Expect the formatString method to return the input string unchanged when using the default format
			expect(lorem.formatString(str)).toEqual(str);
		});

		/**
		 * Test case: Should return the string if the format is set to 'plain'.
		 */
		test("Should return the string if the format is set to 'plain'", () => {
			const lorem = new VeganIpsum({}, FORMAT_PLAIN);
			// Expect the formatString method to return the input string unchanged when the format is set to 'plain'
			expect(lorem.formatString(str)).toEqual(str);
		});

		/**
		 * Test case: Should return the string wrapped in <p> tags if the format is set to 'html'.
		 */
		test("Should return the string wrapped in p tags if the format is set to 'html'", () => {
			const lorem = new VeganIpsum({}, FORMAT_HTML);
			// Expect the formatString method to return the input string wrapped in <p> tags when the format is set to 'html'
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
				// Expect each formatted string to equal the corresponding input string when using the default format
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
				// Expect each formatted string to equal the corresponding input string when the format is set to 'plain'
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
				// Expect each formatted string to equal the corresponding input string wrapped in <p> tags when the format is set to 'html'
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
		test("should generate a specific number of words", () => {
			const lorem = new VeganIpsum();
			const results = lorem.generateWords(7);
			const words = results.split(" ");
			// Expect the number of words to match the specified count of 7 when generateWords is called with 7
			expect(words).toHaveLength(7);
		});

		/**
		 * Test case: Should generate a number of words between the min and max.
		 */
		test("should generate a number of words between the min and max", () => {
			const max = 5;
			const min = 3;
			const lorem = new VeganIpsum({ wordsPerSentence: { max, min } });
			for (let i = 0; i < 100; i++) {
				const results = lorem.generateWords();
				const words = results.split(" ");
				// Expect the number of words to be between the specified min and max when generateWords is called without arguments and the wordsPerSentence option is set
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
		test("should generate a specific number of sentences", () => {
			const lorem = new VeganIpsum();
			const results = lorem.generateSentences(18);
			const sentences = results.split(". ");
			// Expect the number of sentences to match the specified count of 18 when generateSentences is called with 18
			expect(sentences).toHaveLength(18);
		});

		/**
		 * Test case: Should generate a number of sentences between the min and max.
		 */
		test("should generate a number of sentences between the min and max", () => {
			const max = 19;
			const min = 16;
			const lorem = new VeganIpsum({
				sentencesPerParagraph: { max, min },
			});
			for (let i = 0; i < 100; i++) {
				const results = lorem.generateSentences();
				const sentences = results.split(". ");
				// Expect the number of sentences to be between the specified min and max when generateSentences is called without arguments and the sentencesPerParagraph option is set
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
		test("should generate a specific number of paragraphs", () => {
			process.setPlatform(SUPPORTED_PLATFORMS.WIN32);
			const lorem = new VeganIpsum();
			const results = lorem.generateParagraphs(3);
			const paragraphs = results.split(LINE_ENDINGS.WIN32);
			// Expect the number of paragraphs to match the specified count of 3 when generateParagraphs is called with 3 and the platform is set to WIN32
			expect(paragraphs).toHaveLength(3);
		});
	});
});
