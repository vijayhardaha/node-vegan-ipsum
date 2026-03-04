# Changelog

All notable changes to this project are documented in this file.

## v2.0.0 (2026-03-04)

### ⚠️ BREAKING CHANGES

- **Runtime:** Dropped support for Node.js < 20. The engine requirement is now `>= 20.x`.

### ✨ Features

- **Build:** Migrated from Rollup/Babel to **Vite** for faster builds and modern bundling.
- **Build:** Added dual output support, shipping explicit ESM (`dist/index.mjs`) and CJS (`dist/index.cjs`) bundles with source maps.
- **Types:** Added TypeScript declaration generation to `types/` via `vite-plugin-dts`.
- **CLI:** Refactored binary build to output as CJS with an injected shebang.

### 🐛 Fixes

- Resolved build issues regarding Node built-ins (`child_process`) in CLI code.
- Added TypeScript declaration for `nock-exec` to satisfy test imports.

### 📦 Chores

- Removed unused Babel and Rollup devDependencies.
- Updated `package.json` exports and engines for modern Node.js compatibility.
- Merged legacy `test/` directory into `tests/` and added local interop validation helpers.
- Updated documentation with architectural context and tooling guidance.

> **Note:** If v2.0.0 doesn't work for you, please use version **1.0.4**.

## v1.0.4 (2026-02-17)

- Chore: Bump dependencies to latest versions for security and performance.
- Chore: Enhance testing setup for better coverage and reliability.
- Chore: Update release configuration for improved automation.
- Docs: Update README with latest changes and usage instructions.
- Fix: Correct typos in code comments and documentation.
- Fix: Update ESLint configuration for latest version compatibility.
- Fix: Resolve issues with `nockExec` function for better error handling.
- Refactor: Consolidate constants and restructure project files for better maintainability.
- Refactor: Update utility functions for improved readability.

## v1.0.3 (2025-05-04)

- Chore: Enhance TypeScript configuration for stricter type checking.

## v1.0.2 (2025-05-03)

- Chore: Ignore specific config files from the npm package.

## v1.0.1 (2025-05-03)

- Fix: Correct package link in README description.

## v1.0.0 (2025-05-03)

- Chore: Initial release of node-vegan-ipsum.
