// A brief description of the CLI tool's functionality.
export const DESCRIPTION = "Generates one or more words|sentences|paragraphs";
// An example of how to use the CLI tool.
export const USAGE = "3 words [options]";

/**
 * An object containing the clipboard copy commands for different platforms.
 *
 * - `DARWIN`: Command for macOS (`pbcopy`).
 * - `LINUX`: Command for Linux (`xclip -selection clipboard`).
 * - `WIN32`: Command for Windows (`clip`).
 */
export const COPY = {
  DARWIN: "pbcopy",
  LINUX: "xclip -selection clipboard",
  WIN32: "clip",
};

// Error message indicating that the host operating system could not be determined.
export const CANNOT_DETERMINE_PLATFORM = "Could not determine host operating system.";

export default { DESCRIPTION, USAGE, COPY, CANNOT_DETERMINE_PLATFORM };
