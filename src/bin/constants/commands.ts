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
