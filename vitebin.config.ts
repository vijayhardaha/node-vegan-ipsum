/**
 * ==============================================================================
 * VITE BIN CONFIG — CLI Build (CJS)
 * ==============================================================================
 * Purpose: Build the CLI entry as a single CJS bundle and inject a shebang.
 * Docs:    https://vitejs.dev/guide/build.html
 * ==============================================================================
 */

import type { OutputBundle, Plugin } from 'rollup';
import { defineConfig } from 'vite';

// -------------------------
// Shebang injector plugin
// -------------------------
const shebangPlugin = (shebang = '#!/usr/bin/env node') => {
  return {
    name: 'shebang-inject',
    generateBundle(_options, bundle: OutputBundle) {
      for (const fileName of Object.keys(bundle)) {
        const chunk = bundle[fileName];
        if (chunk && chunk.type === 'chunk' && fileName.endsWith('.js')) {
          chunk.code = `${shebang}\n${chunk.code}`;
        }
      }
    },
  } as Plugin;
};

// -------------------------
// Vite config for CLI
// -------------------------
export default defineConfig({
  build: {
    // Single CJS output for the CLI
    lib: {
      entry: 'src/bin/vegan-ipsum.bin.ts',
      formats: ['cjs'],
      fileName: (_format, entryName) => {
        return `${entryName}.js`;
      },
    },

    // Treat runtime-only dependencies and Node built-ins as external
    rollupOptions: {
      external: ['commander', 'child_process'],
      output: { entryFileNames: 'bin/vegan-ipsum.bin.js', chunkFileNames: 'bin/[name].js' },
    },

    ssr: true,
    outDir: 'dist',
    sourcemap: true,

    // Don't empty dist here; primary library build empties it
    emptyOutDir: false,
  },

  plugins: [shebangPlugin()],
});
