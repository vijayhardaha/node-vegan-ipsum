import type { OutputBundle, Plugin } from "rollup";
import { defineConfig } from "vite";

const shebangPlugin = (shebang = "#!/usr/bin/env node") => {
  return {
    name: "shebang-inject",
    generateBundle(_options, bundle: OutputBundle) {
      for (const fileName of Object.keys(bundle)) {
        const chunk = bundle[fileName];
        if (chunk && chunk.type === "chunk" && fileName.endsWith(".cjs")) {
          chunk.code = `${shebang}\n${chunk.code}`;
        }
      }
    },
  } as Plugin;
};

export default defineConfig({
  build: {
    lib: {
      entry: "src/bin/vegan-ipsum.bin.ts",
      name: "vegan-ipsum-bin",
      formats: ["cjs"],
      fileName: () => "bin/vegan-ipsum.bin.cjs",
    },
    rollupOptions: {
      external: ["commander", "child_process"],
    },
    outDir: "dist",
    sourcemap: true,
    // Don't empty dist here; the primary library build will empty it.
    emptyOutDir: false,
  },
  plugins: [shebangPlugin()],
});
