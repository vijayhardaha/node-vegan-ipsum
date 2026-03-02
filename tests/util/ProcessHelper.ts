/**
 * Helper to mock and restore Node `process.platform` during tests.
 *
 * Provides simple methods to set and reset the platform value for unit tests.
 */
class ProcessHelper {
	/** Cache of the original `process.platform` value. */
	public cachedPlatform: string;

	/**
	 * Create a new ProcessHelper and capture the current platform.
	 *
	 * @example
	 * const p = new ProcessHelper();
	 */
	constructor() {
		// Store the real platform so tests can restore it later.
		this.cachedPlatform = process.platform;
	}

	/**
	 * Reset `process.platform` to the originally cached value.
	 *
	 * @example
	 * const p = new ProcessHelper();
	 * p.setPlatform('win32');
	 * p.resetPlatform(); // restores original platform
	 */
	public resetPlatform() {
		this.setPlatform(this.cachedPlatform);
	}

	/**
	 * Set `process.platform` to a provided value for the duration of a test.
	 *
	 * @param {string} platform - The platform string to apply (e.g. 'win32').
	 * @example
	 * const p = new ProcessHelper();
	 * p.setPlatform('darwin');
	 */
	public setPlatform(platform: string = this.cachedPlatform) {
		// Define the property directly so it can be redefined in later tests.
		Object.defineProperty(process, "platform", {
			value: platform,
			// Allow subsequent redefinition by tests that call setPlatform again.
			configurable: true,
		});
	}
}

export default ProcessHelper;
