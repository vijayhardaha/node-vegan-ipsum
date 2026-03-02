/**
 * ============================================================================
 * ESLINT CONFIG
 * ============================================================================
 * Purpose: Flat ESLint configuration for JavaScript and TypeScript. It
 * - enables recommended JavaScript rules (via `@eslint/js`),
 * - applies TypeScript rules to `.ts`/`.tsx` files (via `@typescript-eslint`),
 * - surfaces Prettier issues through `eslint-plugin-prettier`, and
 * - disables conflicting ESLint rules using `eslint-config-prettier/flat`.
 *
 * Docs: https://eslint.org/docs/latest/use/configure/configuration-files-new
 * ============================================================================
 */

// -------------------------
// Imports
// -------------------------
import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import { URL } from "node:url";

// -------------------------
// Context
// -------------------------
// Resolve a workspace-root-like path for parser options
const __dirname = new URL(".", import.meta.url).pathname;

// -------------------------
// Exported flat config
// -------------------------
export default defineConfig([
	// =========================
	// 1) Global Ignores
	// =========================
	// Skip heavy/generated folders before parsing any files
	{
		ignores: [
			"**/.git/",
			"**/node_modules/",
			"**/dist/",
			"**/coverage/",
			"**/types/",
			"**/*.log",
			"**/*.tsbuildinfo",
			"**/*.test.ts",
			"**/*.spec.ts",
		],
	},

	// =========================
	// 2) Base JavaScript Rules
	// =========================
	// Uses the official recommended rules for standard JS projects.
	js.configs.recommended,

	// =========================
	// 3) TypeScript (only .ts/.tsx)
	// =========================
	// Apply TypeScript parser & plugin only to TypeScript files. Keeping
	// this separate prevents the TS parser from attempting to parse plain JS.
	{
		files: ["**/*.ts", "**/*.tsx"],

		// Register plugins used in this block
		plugins: {
			"@typescript-eslint": tsPlugin,
			prettier: eslintPluginPrettier,
		},

		// Language & parser configuration for TypeScript files
		languageOptions: {
			globals: { ...globals.node },
			parser: tsParser,
			parserOptions: {
				tsconfigRootDir: __dirname,
				project: "./tsconfig.json",
			},
		},

		// Rules: include the plugin's recommended rules and project-specific overrides
		rules: {
			...tsPlugin.configs.recommended.rules,
			"prettier/prettier": "error",
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					vars: "all",
					varsIgnorePattern: "^_",
					args: "after-used",
					argsIgnorePattern: "^_",
					ignoreRestSiblings: true,
					caughtErrors: "all",
				},
			],
		},
	},

	// =========================
	// 4) Prettier integration for all source files
	// =========================
	// Register the Prettier plugin and report formatting issues as ESLint errors.
	{
		files: ["**/*.{js,jsx,ts,tsx,mjs,cjs}"],
		plugins: { prettier: eslintPluginPrettier },
		rules: { "prettier/prettier": ["error"] },
	},

	// =========================
	// 5) Prettier flat config (last)
	// =========================
	// Disables ESLint rules that conflict with Prettier formatting decisions.
	eslintConfigPrettier,
]);
