# Changelog

All notable changes to this project are documented in this file.

## Unreleased (2026-03-02)

### Development

- Chore: Migrate build to Vite for faster builds and modern bundling.
- Chore: Add `vitebin.config.ts` to build the CLI bin as CJS and inject a shebang.
- Chore: Replace `gsed` bin exec with Vite-based bin build and `shebang-inject`.
- Chore: Add `vite-plugin-dts` to emit TypeScript declaration files (`types/`).
- Chore: Switch dist outputs to explicit `index.mjs` (ESM) and `index.cjs` (CJS).
- Chore: Bump engines to Node.js >= 20.x and npm >= 9.x for development; update README to document these requirements.
- Chore: Cleanup — remove unused Babel + Rollup devDependencies now that Vite handles bundling.
- Docs: Update `.github/copilot-instructions.md` with architectural context, coding standards, and tooling guidance.
- Fix: Add permissive TypeScript declaration `src/types/nock-exec.d.ts` to satisfy test imports.
- Fix: Fix build issues related to Node built-ins (`child_process`) by requiring them in CLI code.
- Refactor: Merge legacy `test/` directory into `tests/` and update imports to `tests/util/ProcessHelper.ts`.
- Test: Add `test:local` and `tests/local/*` scripts/files to validate CJS/ESM interop locally.

### Production

- Build: Dist now includes both ESM (`dist/index.mjs`) and CJS (`dist/index.cjs`) bundles with source maps.
- Build: CLI published as `dist/bin/vegan-ipsum.bin.cjs` with an injected shebang and executable bit.
- Chore: Update `package.json` with `main`, `module`, and `exports` to support conditional ESM/CJS resolution.
- Chore: Bump `package.json` engines to require Node.js >= 20.x and npm >= 9.x; update README to reflect runtime requirements.

## v1.0.4 (2026-02-17)

- Chore: bump dependencies to latest versions for improved performance and security
- Chore: enhance testing setup for better coverage and reliability
- Chore: update dependencies to latest versions for improved performance and security
- Chore: update release configuration for better automation and consistency
- Docs: update readme with latest changes and usage instructions
- Fix: correct some typos in code comments and documentation
- Fix: fix eslint configuration for better compatibility with latest eslint version
- Fix: resolve some issues with nockExec function for better error handling and flexibility
- Refactor: consolidate constants into fewer files for better maintainability
- Refactor: restructure project files for better organization and clarity
- Refactor: update utility functions for better readability and maintainability

## v1.0.3 (2025-05-04)

- Chore: enhance typescript configuration for better type checking and code quality

## v1.0.2 (2025-05-03)

- Chore: ignore some config files from npm package

## v1.0.1 (2025-05-03)

- Fix: correct package link in readme description

## v1.0.0 (2025-05-03)

- Chore: Initial release of node-vegan-ipsum
