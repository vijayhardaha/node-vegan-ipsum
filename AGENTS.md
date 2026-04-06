# AGENTS.md

> **This file serves as the authoritative reference for AI agents working on the `node-vegan-ipsum` codebase.**

## Project Overview

- **Type**: Node.js library and CLI tool (vegan placeholder text generator)
- **Lang**: TypeScript (strict mode)
- **Runtime**: Node.js >= 20
- **Build Tool**: Vite
- **Package Manager**: pnpm

## Available Commands

```bash
# Development
pnpm run dev            # Start development server

# Building
pnpm run build          # Clean, build types, JS (ESM/CJS), and CLI binary
pnpm run build:js       # Library build via vite.config.ts
pnpm run build:bin      # CLI build via vitebin.config.ts

# Testing
pnpm run test           # Run tests (Vitest)
pnpm run test:local     # Run manual interop checks (tests/local/)

# Linting & Formatting
pnpm run lint           # ESLint checks
pnpm run format         # Prettier auto-fix
pnpm run format:check   # Prettier validation

# Type Checking
pnpm run types          # TypeScript type check
```

## Project Architecture

### Core Structure

- **Entry Point:** `src/index.ts` exports `veganIpsum` (instance) and `VeganIpsum` (class)
- **Core Logic:**
  - `src/lib/VeganIpsum.ts`: Main class implementation
  - `src/lib/generator.ts`: Core generation logic for words, sentences, and paragraphs
- **CLI:**
  - `src/bin/vegan-ipsum.bin.ts`: Entry point for the CLI
  - `src/bin/util/index.ts`: Helpers for clipboard, platform detection, and versioning
- **Utilities:**
  - `src/util/strings.ts`: String/array manipulation (`capitalize`, `rangeArray`)
  - `src/util/env.ts`: Environment detection (`isNode`, `isReactNative`, `isWindows`)
- **Constants:** `src/constants/` contains word lists and static values

### Build Outputs

- Dual module support: ESM (`dist/index.mjs`) and CJS (`dist/index.cjs`)
- CLI Bundle: CJS only (`dist/bin/vegan-ipsum.bin.cjs`) with shebang injection
- Types: Declarations (`.d.ts`) emitted to `types/` via `vite-plugin-dts`

## Naming Conventions

- Classes: `PascalCase` (`VeganIpsum`, `Generator`)
- Functions/Variables: `camelCase` (`generateWords`, `capitalize`)
- Files: `kebab-case` for utilities/helpers (`strings.ts`, `env.ts`)
- Constants: `SCREAMING_SNAKE_CASE` (`MAX_SENTENCES`)
- Types/Interfaces: `PascalCase` (`VeganIpsumParams`)

## Rules

- Use `interface` for public API definitions and object shapes that might be extended
- Use `type` for union types, tuples, or computed types
- No `any`: Always define proper types. Use `unknown` if type is uncertain
- Avoid non-null assertions `!`. Use optional chaining `?.` or logical checks
- Public types must be re-exported from `src/index.ts`
- Add JSDoc comments for all exported functions, classes, and complex types
- Do not add JSDoc for obvious props or simple utilities
- Import grouping: Node built-ins first, External libraries second, Internal modules third
- Unused variables: prefix with `_` if intentionally unused
- Error handling: Use async/await and `expect(...).resolves/rejects` with Vitest; avoid deprecated `done` callbacks
- Prefer `vi` for spies/mocks (replacement for Jest's `jest`)

### JSDoc Example

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

## Git Workflow

Pre-commit hooks automatically run type check, lint, and format checks.

**Before preparing git.md (after each task):**

1. Run `pnpm run tsc` - Type check
2. Run `pnpm run format:check` - Format check
3. Run `pnpm run lint` - ESLint check

**After completing a task:**

1. Check unstaged changes: `git status --porcelain` && `git diff`
2. Stage files: `git add <files>`
3. Create `.tmp/git.md` containing the staged files and commit command
4. Create separate commits for each logical change or file; group similar changes only if they modify the same type of files

Example `.tmp/git.md`:

```bash
git add src/lib/generator.ts
git commit -m "feat(generator): add support for custom word lists

- allow passing custom vocabulary
- validate word list input"
```

## Commit Conventions

**Format:** `<type>(<scope>): <summary>`

**Types:** `feat`, `fix`, `docs`, `test`, `refactor`, `style`, `build`, `chore`

**Rules:** Subject line ≤50 chars, lowercase, body (optional) wrapped at 72 chars.

**Examples:**

- `feat(cli): add copy to clipboard flag`
- `fix(generator): handle empty array input`
- `build: update vite config`

## Notes

- Package exports defined in `package.json` for dual entry points
- Tests co-located with source files in `src/**` (e.g., `generator.test.ts`)
- Interop tests in `tests/local/` for manual ESM/CJS checks
