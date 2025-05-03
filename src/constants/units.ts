/**
 * Represents the unit type for words.
 */
export const UNIT_WORDS = "words";

/**
 * Represents the unit type for sentences.
 */
export const UNIT_SENTENCES = "sentences";

/**
 * Represents the unit type for paragraphs.
 */
export const UNIT_PARAGRAPHS = "paragraphs";

/**
 * An array of supported unit types for generating text.
 */
export const UNITS = [UNIT_WORDS, UNIT_SENTENCES, UNIT_PARAGRAPHS];

/**
 * Type representing the supported unit types for generating text.
 */
export type LoremUnit = "words" | "sentences" | "paragraphs";
