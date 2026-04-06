/**
 * ==============================================================================
 * VITE CONFIG — Library Build (ESM + CJS)
 * ==============================================================================
 * Purpose: Build the library into dual formats (ESM/CJS) and emit type declarations.
 * Docs:    https://vitejs.dev/guide/build.html
 * ==============================================================================
 */

import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// -------------------------
// Build configuration
// -------------------------
export default defineConfig({
  build: {
    // Produce source maps for easier debugging in consumers
    sourcemap: true,

    // Clean `dist/` before building (primary library build)
    emptyOutDir: true,

    // Library mode: entry + output naming
    lib: {
      entry: 'src/index.ts',
      name: 'vegan-ipsum',
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'index.mjs' : 'index.cjs'),
    },

    // Ensure named exports for consumers
    rollupOptions: { output: { exports: 'named' } },

    // Explicit output directory
    outDir: 'dist',
  },

  // -------------------------
  // Plugins
  // -------------------------
  // Emit declarations into `types/` and create a types entry
  plugins: [dts({ insertTypesEntry: true, outDir: 'types' })],
});
