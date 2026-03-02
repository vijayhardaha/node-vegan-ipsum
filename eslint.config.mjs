/**
 * ===================================================================
 * ESLINT CONFIG (Flat config)
 * ===================================================================
 * Purpose: Project-wide linting configuration. Enables recommended JS
 * and TypeScript rules, integrates Prettier as an ESLint rule, and
 * defines reasonable ignore patterns for build and generated files.
 * Docs: https://eslint.org/docs/latest/use/configure/configuration-files-new
 * ===================================================================
 */

// -------------------------
// ESLint / Plugin Imports
// -------------------------
import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier/flat";

// -------------------------
// Exported flat config
// -------------------------
export default defineConfig([
	// Base JavaScript rules from @eslint/js
	js.configs.recommended,

	{
		// Target files for this block
		files: ["**/*.{js,ts,mjs,cjs}"],

		// Files and directories the linter should ignore (speed & noise)
		ignores: [
			"**/.git/",
			"**/node_modules/",
			"**/dist/",
			"**/coverage/",
			"**/types/",
			"**/*.log",
			"**/*.tsbuildinfo",
			"**/*.test.ts",
		],

		// Plugins used in rule definitions below
		plugins: {
			"@typescript-eslint": tsPlugin,
			prettier: eslintPluginPrettier,
		},

		// Language / parser configuration
		languageOptions: {
			ecmaVersion: "latest",
			sourceType: "module",
			globals: { ...globals.node },
			parser: tsParser,
		},

		// Project-specific rules (do not change semantics here)
		rules: {
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

			// Use eslint-plugin-prettier to surface Prettier issues as ESLint errors
			"prettier/prettier": "error",
		},
	},

	// Prettier flat config to disable ESLint rules that conflict with Prettier
	eslintConfigPrettier,
]);
