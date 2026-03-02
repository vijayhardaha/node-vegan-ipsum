/**
 * ===================================================================
 * ESLINT CONFIG (Flat config)
 * ===================================================================
 */
import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default defineConfig([
	// 1. Global Ignores (Must be the first item in the array)
	// This ensures ESLint completely skips these paths before attempting to parse.
	{
		ignores: [
			"**/.git/",
			"**/node_modules/",
			"**/dist/",
			"**/coverage/",
			"**/types/",
			"**/*.log",
			"**/*.tsbuildinfo",
			"**/*.test.{ts,tsx,js,jsx}",
		],
	},

	// 2. Base JavaScript rules
	js.configs.recommended,

	// 3. TypeScript Specific Configuration
	{
		// ONLY target TypeScript files here.
		// If you include .js, the TS parser will try to parse vanilla JS as TS, causing errors.
		files: ["**/*.ts"],

		plugins: {
			"@typescript-eslint": tsPlugin,
			prettier: eslintPluginPrettier,
		},

		languageOptions: {
			ecmaVersion: "latest",
			sourceType: "module",
			globals: { ...globals.node },
			// Apply the TS parser ONLY to .ts files
			parser: tsParser,
			parserOptions: {
				project: "./tsconfig.json", // Optional: enables type-aware linting
				ecmaVersion: "latest",
                sourceType: "module",
			},
		},

		rules: {
			...tsPlugin.configs.recommended.rules,
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
			"prettier/prettier": "error",
		},
	},

	// 4. Prettier Config (Disables conflicting ESLint rules)
	eslintConfigPrettier,
]);
