/**
 * ###############################################################################
 * GIT COMMIT ENFORCER
 * ###############################################################################
 * PURPOSE:
 * 		Enforces Conventional Commits (feat:, fix:, chore:) to ensure the
 *		project history remains readable and compatible with automated changelogs.
 * ###############################################################################
 */

/** @type {import('@commitlint/types').UserConfig} */
const config = {
	// --- Base Ruleset ---
	extends: ["@commitlint/config-conventional"],

	// --- Strict Standards ---
	rules: {
		// Enforce a concise header to keep 'git log --oneline' clean
		"header-max-length": [2, "always", 50],

		// Ensure the body doesn't wrap awkwardly in terminal views
		"body-max-line-length": [2, "always", 72],

		// Maintain a clean, lowercase style for the subject line
		"subject-case": [2, "always", ["lower-case"]],
	},
};

export default config;
