// Represents the HTML format for generated text.
export const FORMAT_HTML = "html";
// Represents the plain text format for generated text.
export const FORMAT_PLAIN = "plain";
// An array of supported formats for generated text.
export const FORMATS = [FORMAT_HTML, FORMAT_PLAIN];
// Type representing the supported formats for generated text.
export type LoremFormat = "plain" | "html";

/**
 * An object representing line endings for different platforms.
 *
 * - `POSIX`: Line ending for POSIX-compliant systems (`\n`).
 * - `WIN32`: Line ending for Windows systems (`\r\n`).
 */
export const LINE_ENDINGS = {
  POSIX: "\n",
  WIN32: "\r\n",
};

/**
 * An object representing supported platforms.
 *
 * - `DARWIN`: macOS platform identifier.
 * - `LINUX`: Linux platform identifier.
 * - `WIN32`: Windows platform identifier.
 */
export const SUPPORTED_PLATFORMS = {
  DARWIN: "darwin",
  LINUX: "linux",
  WIN32: "win32",
};

/**
 * An object containing regular expressions for validating formats and units.
 *
 * - `FORMATS`: Matches supported text formats (`plain` or `html`), case-insensitive.
 * - `UNITS`: Matches supported unit types (`paragraphs`, `sentences`, `words`), case-insensitive.
 */
export const REGEX = {
  FORMATS: /^(plain|html)$/i,
  UNITS: /^(paragraphs|sentences|words)$/i,
};

// Represents the unit type for words.
export const UNIT_WORDS = "words";
// Represents the unit type for sentences.
export const UNIT_SENTENCES = "sentences";
// Represents the unit type for paragraphs.
export const UNIT_PARAGRAPHS = "paragraphs";
// An array of supported unit types for generating text.
export const UNITS = [UNIT_WORDS, UNIT_SENTENCES, UNIT_PARAGRAPHS];
// Type representing the supported unit types for generating text.
export type LoremUnit = "words" | "sentences" | "paragraphs";

export default {
  FORMAT_HTML,
  FORMAT_PLAIN,
  FORMATS,
  LINE_ENDINGS,
  SUPPORTED_PLATFORMS,
  REGEX,
  UNIT_WORDS,
  UNIT_SENTENCES,
  UNIT_PARAGRAPHS,
  UNITS,
};
