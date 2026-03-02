# Copilot Instructions

This document provides a summary of the repository architecture, tooling, and conventions to assist GitHub Copilot in generating relevant code suggestions.

## Tech Stack & Build System

- **Language:** TypeScript.
- **Build Tool:** Vite.
- **Package Manager:** pnpm.
- **Outputs:** Dual output support for ESM (`dist/index.mjs`) and CJS (`dist/index.cjs`).
- **CLI:** Built as a separate CJS bundle with shebang injection via `vitebin.config.ts`.
- **Types:** Declarations (`.d.ts`) are emitted to `types/` using `vite-plugin-dts`.

## Project Architecture

The codebase is separated into library logic, CLI utilities, and core generation.

### 1. Entry Points & Public API

- **Main Entry:** `src/index.ts`
- **Public API:** Exports `veganIpsum` (instance) and `VeganIpsum` (class).
- **Implementation:** Logic resides in `src/lib/VeganIpsum.ts`.

### 2. Core Logic

- **Generator:** `src/lib/generator.ts` contains the core logic for generating words, sentences, and paragraphs.
- **Constants:** Word lists and constants are located in `src/constants/`.

### 3. Utilities

- **String/Array Utils:** `src/util/strings.ts` (`capitalize`, `rangeArray`, `fillArrayWith`).
- **Environment Detection:** `src/util/env.ts` (`isNode`, `isReactNative`, `isWindows`).
- **CLI Helpers:** `src/bin/util/index.ts` (`copyToClipboard`, `getCopyCommand`, `getPlatform`).

## Code Style & Documentation

- **Comments:** Use JSDoc-style comments for public APIs and core modules.
- **Linting:** ESLint with TypeScript parser and Prettier integration (`eslint.config.mjs`).
- **Formatting:** Prettier (`prettier.config.mjs`) and EditorConfig (`.editorconfig`).
    - Use **tabs** for indentation.
    - Enforce **LF** line endings.
- **Types:** Public types (e.g., `VeganIpsumParams`) must be exported from `src/index.ts`.

## Testing

- **Framework:** Jest (configured in `package.json`).
- **Locations:**
    - Unit tests: `src/**` and `tests/**` (e.g., `src/lib/generator.test.ts`).
    - Local interop sanity checks: `tests/local/` (includes ESM, CJS, and interop scripts).
- **Commands:**
    - `pnpm run test`: Run Jest suite.
    - `pnpm run test:local`: Run manual interop checks.

## Build & Distribution Commands

- **Build All:** `pnpm run build` (Cleans, builds types, JS, and CLI binary).
- **Build Library:** `pnpm run build:js` (Uses `vite.config.ts`).
- **Build CLI:** `pnpm run build:bin` (Uses `vitebin.config.ts`).
- **Linting:** `pnpm run lint` (ESLint).
- **Formatting:** `pnpm run format` (Prettier).

## Key Configuration Notes

- **TypeScript:** `tsconfig.json` uses `module: commonjs` for type checking, while Vite outputs both ESM and CJS.
- **Exports:** `package.json` defines conditional exports for dual resolution.
- **Node Version:** Requires Node >= 20.
- **NPM Package:** `.npmignore` is configured to include the `dist/` directory in published packages.
