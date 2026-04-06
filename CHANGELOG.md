# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.1] - 2026-04-06

### Changed

- Reverted ESM bundle extension from `.js` back to `.mjs` for better compatibility
- Updated CLI binary output extension from `.cjs` to `.js`
- Reordered `package.json` fields for better readability

### Fixed

- Corrected Vite SSR build to output CLI binary to proper path
- Updated shebang injection to target correct file extension

## [2.0.0] - 2026-03-04

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

## [1.0.4] - 2026-02-17

### Changed

- Bumped dependencies to latest versions for security and performance
- Enhanced testing setup for better coverage and reliability
- Updated release configuration for improved automation
- Consolidated constants and restructured project files for better maintainability
- Updated utility functions for improved readability

### Fixed

- Corrected typos in code comments and documentation
- Updated ESLint configuration for latest version compatibility
- Resolved issues with `nockExec` function for better error handling

### Documentation

- Updated README with latest changes and usage instructions

## [1.0.3] - 2025-05-04

### Changed

- Enhanced TypeScript configuration for stricter type checking

## [1.0.2] - 2025-05-03

### Changed

- Excluded specific config files from the npm package

## [1.0.1] - 2025-05-03

### Fixed

- Corrected package link in README description

## [1.0.0] - 2025-05-03

### Added

- Initial release of node-vegan-ipsum

[Unreleased]: https://github.com/vijayhardaha/node-vegan-ipsum/compare/v2.0.1...HEAD
[2.0.1]: https://github.com/vijayhardaha/node-vegan-ipsum/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/vijayhardaha/node-vegan-ipsum/releases/tag/v2.0.0
[1.0.4]: https://github.com/vijayhardaha/node-vegan-ipsum/compare/v1.0.3...v1.0.4
[1.0.3]: https://github.com/vijayhardaha/node-vegan-ipsum/compare/v1.0.2...v1.0.3
[1.0.2]: https://github.com/vijayhardaha/node-vegan-ipsum/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/vijayhardaha/node-vegan-ipsum/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/vijayhardaha/node-vegan-ipsum/releases/tag/v1.0.0
