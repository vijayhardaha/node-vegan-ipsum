/**
 * ======================================================================
 * VITEST CONFIG
 * ======================================================================
 * Purpose: Configure Vitest for unit testing in a Node environment. This
 *          file keeps test runner behaviour, globals, and coverage
 *          settings in one place so contributors can run tests consistently.
 * Docs:    https://vitest.dev/config/
 * ======================================================================
 */

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // ==========================================
    // Runtime
    // ==========================================
    // Use Node environment for tests (server-side APIs available)
    globals: true,
    environment: 'node',

    // ==========================================
    // Files
    // ==========================================
    // Patterns for test files picked up by the runner
    include: ['src/**/*.test.ts', 'src/**/*.spec.ts'],

    // ==========================================
    // Coverage
    // ==========================================
    // Use V8 provider for fast, accurate coverage. Output both a
    // human-readable `text` report and an `lcov` report for CI.
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      include: ['src/**/*.ts'],
      exclude: ['src/bin/**/*.bin.ts', 'src/@types/**/*.d.ts', 'src/types/nock-exec.d.ts', 'src/util/index.ts'],
    },
  },
});
