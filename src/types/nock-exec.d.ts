/* eslint-disable no-unused-vars */
/**
 * Minimal TypeScript declaration for the `nock-exec` test helper.
 * The real package is a small test helper used only in tests, so keep typing permissive.
 */
declare module "nock-exec" {
	type ExecResult = any;

	/**
	 * Mock execution of a shell command. Returns a helper object or value used by tests.
	 * Signature is permissive so tests can use the helper freely.
	 */

	function nockExec(command: string, ...args: any[]): ExecResult;

	export default nockExec;
}
