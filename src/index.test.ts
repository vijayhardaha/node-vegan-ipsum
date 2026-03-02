import ProcessHelper from "../tests/util/ProcessHelper";

import {
	LoremUnit,
	LINE_ENDINGS,
	SUPPORTED_PLATFORMS,
	UNIT_PARAGRAPHS,
	UNIT_SENTENCES,
	UNIT_WORDS,
} from "./constants";

import { veganIpsum } from ".";

/**
 * Unit tests for the `veganIpsum` convenience function validating output
 * units, counts, and formatting across common input combinations.
 */
describe("veganIpsum", () => {
	// Helper to mock and reset the platform during tests.
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
		// Expect the result to be a non-empty string ending with a period.
		expect(result.slice(-1)).toEqual(".");

		// Expect the result to contain exactly one sentence.
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
			// Expect the number of paragraphs to match the specified count.
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
			// Expect the number of sentences to match the specified count.
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
			// Expect the number of words to match the specified count.
			expect(words).toHaveLength(count);
		});
	});

	/**
	 * Tests that `veganIpsum` returns an empty string when an invalid `units` parameter is provided.
	 */
	test("Should return an empty string for invalid units", () => {
		// @ts-expect-error Testing invalid units input
		// Expect the function to return an empty string when units are not recognized.
		expect(veganIpsum({ count: 7, units: "unknown" })).toEqual("");
	});
});
