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
