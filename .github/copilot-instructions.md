# Copilot Instructions

This document provides architectural context, coding standards, and tooling configuration for GitHub Copilot. Adhering to these instructions ensures consistency across the codebase.

## 1. Tech Stack & Build System

- **Language:** TypeScript (Strict mode enabled).
- **Runtime Environment:** Node.js (>= 20).
- **Build Tool:** Vite.
- **Package Manager:** pnpm.
- **Outputs:**
    - Dual module support: ESM (`dist/index.mjs`) and CJS (`dist/index.cjs`).
    - CLI Bundle: CJS only (`dist/bin/vegan-ipsum.bin.cjs`) with shebang injection.
- **Types:** Declarations (`.d.ts`) emitted to `types/` via `vite-plugin-dts`.

## 2. Project Architecture

The project is a library and CLI tool for generating vegan placeholder text.

### Core Structure

- **Entry Point:** `src/index.ts` exports `veganIpsum` (instance) and `VeganIpsum` (class).
- **Core Logic:**
    - `src/lib/VeganIpsum.ts`: Main class implementation.
    - `src/lib/generator.ts`: Core generation logic for words, sentences, and paragraphs.
- **CLI:**
    - `src/bin/vegan-ipsum.bin.ts`: Entry point for the CLI.
    - `src/bin/util/index.ts`: Helpers for clipboard, platform detection, and versioning.
- **Utilities:**
    - `src/util/strings.ts`: String/array manipulation (`capitalize`, `rangeArray`).
    - `src/util/env.ts`: Environment detection (`isNode`, `isReactNative`, `isWindows`).
- **Constants:** `src/constants/` contains word lists and static values.

## 3. Coding Style & Formatting

### General Rules

- **Language:** Use English for code and comments.
- **Naming Conventions:**
    - **Components/Classes:** PascalCase (e.g., `VeganIpsum`, `Generator`).
    - **Functions/Variables:** camelCase (e.g., `generateWords`, `capitalize`).
    - **Files:** kebab-case for utilities/helpers (e.g., `strings.ts`, `env.ts`).
    - **Constants:** SCREAMING_SNAKE_CASE (e.g., `MAX_SENTENCES`).

### Code Formatting (Prettier)

You must follow the project's formatting configuration. If you cannot read the config file, apply the following defaults:

1. **Print Width:** 100 characters max.
2. **Indentation:** 4 tabs (use tabs, not spaces).
3. **Semicolons:** Do not add semicolons.
4. **Quotes:** Use double quotes.
5. **Trailing Commas:** Add trailing commas in multi-line objects (es5).
6. **Bracket Spacing:** Add spaces inside object literals `{ key: value }`.
7. **Arrow Function Parentheses:** Always use parentheses `(x) => x`.
8. **Operator Position:** Place operators at the start of lines in multiline expressions.

### Linting (ESLint)

- **Imports:** Group imports: Node built-ins first, External libraries second, Internal modules third.
- **Unused Vars:** Do not leave unused variables; prefix with `_` if intentionally unused.

**Important:** Pre-format code blocks in your suggestions to match these rules.

## 4. TypeScript Standards

### Types vs Interfaces

- Use **`interface`** for public API definitions and object shapes that might be extended.
- Use **`type`** for union types, tuples, or computed types.

```typescript
// GOOD
interface VeganIpsumParams {
	count?: number;
	units?: "sentences" | "paragraphs";
}

type Status = "idle" | "generating" | "error";
```

### Strictness

- **NO `any`**: Always define proper types. Use `unknown` if type is uncertain.
- **Non-null assertions:** Avoid `!`. Use optional chaining `?.` or logical checks.
- **Exports:** Public types must be re-exported from `src/index.ts`.

## 5. Documentation (JSDoc)

- Add JSDoc comments for all exported functions, classes, and complex types.
- Do not add JSDoc for obvious props or simple utilities.

```typescript
/**
 * Generates a specified number of vegan-themed sentences.
 *
 * @param {number} count - The number of sentences to generate.
 * @returns An array of generated sentences.
 * @throws {Error} If count is negative.
 */
export function generateSentences(count: number): string[] {
	// implementation
}
```

## 6. Testing

- **Framework:** Vitest (configured via `vitest.config.ts`).
- **Locations:**
    - Unit tests: `src/**` (co-located, e.g., `generator.test.ts`).
    - Interop tests: `tests/local/` (manual ESM/CJS checks).
- **Execution:**
    - `pnpm run test`: Run the Vitest suite.
    - `pnpm run test:local`: Run manual interop checks.
- **Notes:**
    - Prefer `vi` for spies/mocks (replacement for Jest's `jest`).
    - Use async/await and `expect(...).resolves/rejects` with Vitest; avoid deprecated `done` callbacks.
    - Ensure `vitest` types are included in `tsconfig.json` so test globals are typed.
- **Helpers:** Use `data-testid` for stable queries if UI testing is involved.

## 7. Build, Lint, and Scripts

- **Build:**
    - `pnpm run build`: Cleans, builds types, JS (ESM/CJS), and CLI binary.
    - `pnpm run build:js`: Library build via `vite.config.ts`.
    - `pnpm run build:bin`: CLI build via `vitebin.config.ts`.
- **Lint/Format:**
    - `pnpm run lint`: ESLint checks.
    - `pnpm run format`: Prettier auto-fix.
    - `pnpm run format:check`: Prettier validation.
- **Utilities:**
    - `pnpm run types`: Type checking.

## 8. Conventional Commits

Use Conventional Commit messages for all changes.

```
<type>(<scope>): <summary>
```

**Common Types:**

- `feat`: New functionality (e.g., `feat(cli): add copy to clipboard flag`).
- `fix`: Bug fix (e.g., `fix(generator): handle empty array input`).
- `docs`: Documentation only.
- `refactor`: Code changes without behavior change.
- `build`: Build tooling or config changes (e.g., `build: update vite config`).

**Rules:**

- Use a 50-character subject line.
- Use lowercase.
- Body (optional) wrapped at 72 characters.

## 9. Configuration Gotchas

- **TypeScript Config:** `tsconfig.json` uses `module: commonjs` for type checking/declaration emission, while Vite outputs both ESM and CJS.
- **Package Exports:** Defined in `package.json` for dual entry points.
- **NPM Package:** `.npmignore` includes `dist/` in the published package.
