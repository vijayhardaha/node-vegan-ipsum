import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    sourcemap: true,
    emptyOutDir: true,
    lib: {
      entry: "src/index.ts",
      name: "vegan-ipsum",
      formats: ["es", "cjs"],
      fileName: (format) => (format === "es" ? "index.mjs" : "index.cjs"),
    },
    rollupOptions: {
      output: {
        exports: "named",
      },
    },
    outDir: "dist",
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      outDir: "types",
    }),
  ],
});
