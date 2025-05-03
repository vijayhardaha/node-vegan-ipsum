import path from "node:path";
import { fileURLToPath } from "node:url";

import { fixupPluginRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import { defineConfig, globalIgnores } from "eslint/config";
import importPlugin from "eslint-plugin-import";
import prettier from "eslint-plugin-prettier";
import globals from "globals";

// Resolve __dirname and __filename for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize FlatCompat for backward compatibility with older ESLint configurations
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended, // Use recommended JavaScript rules
  allConfig: js.configs.all, // Use all JavaScript rules
});

export default defineConfig([
  // Define global ignore patterns for files and directories
  globalIgnores([
    "**/.git/",
    "**/node_modules/",
    "**/dist/",
    "**/coverage/",
    "**/types/",
    "**/*.log",
    "**/*.tsbuildinfo",
  ]),

  // Specify file extensions to lint
  { files: ["**/*.{js,ts,mjs}"] },

  {
    // Extend recommended ESLint configurations
    ...compat.extends(
      "eslint:recommended", // Base recommended rules
      "plugin:@typescript-eslint/recommended", // TypeScript-specific rules
      "plugin:prettier/recommended" // Prettier integration
    )[0],

    // Define plugins for additional linting capabilities
    plugins: {
      "@typescript-eslint": fixupPluginRules(tsPlugin), // TypeScript linting rules
      import: fixupPluginRules(importPlugin), // Import/export linting rules
      prettier: fixupPluginRules(prettier), // Prettier formatting rules
    },

    // Configure language options
    languageOptions: {
      ecmaVersion: "latest", // Use the latest ECMAScript version
      sourceType: "module", // Enable ES module syntax
      globals: {
        ...globals.node, // Include Node.js global variables
      },

      parser: tsParser, // Use TypeScript parser
      parserOptions: {
        ecmaVersion: "latest", // Use the latest ECMAScript version
        sourceType: "module", // Enable ES module syntax
        tsconfigRootDir: __dirname, // Set the root directory for the TypeScript config
        requireConfigFile: false, // Do not require a separate config file
        babelOptions: {
          presets: ["@babel/preset-env", "@babel/preset-typescript"], // Babel presets for transpilation
        },
      },
    },

    // Define custom linting rules
    rules: {
      // Prettier integration: show warnings for formatting issues
      "prettier/prettier": ["warn", {}, { usePrettierrc: true }],

      // Enforce import order and grouping
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index", "object"],

          pathGroups: [
            {
              pattern: "@/**", // Treat paths starting with "@" as internal
              group: "internal",
              position: "after",
            },
          ],

          alphabetize: {
            order: "asc", // Sort imports alphabetically
            caseInsensitive: true, // Ignore case when sorting
          },

          "newlines-between": "always", // Require newlines between import groups
          warnOnUnassignedImports: true, // Warn on imports without assignments
        },
      ],

      // TypeScript: disallow unused variables
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          vars: "all", // Check all variables
          varsIgnorePattern: "^_", // Ignore variables starting with "_"
          args: "after-used", // Check arguments after they are used
          argsIgnorePattern: "^_", // Ignore arguments starting with "_"
          ignoreRestSiblings: true, // Ignore rest siblings in destructuring
          caughtErrors: "all", // Check all caught errors
        },
      ],
    },
  },
]);
