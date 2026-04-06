/**
 * Helper to mock and restore Node `process.platform` during tests.
 *
 * Provides simple methods to set and reset the platform value for unit tests.
 */
class ProcessHelper {
  /** Cache of the original `process.platform` value. */
  public cachedPlatform: string;
  /** Cache of the original `global.navigator` value. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public cachedNavigator: any;

  /**
   * Create a new ProcessHelper and capture the current platform.
   *
   * @example
   * const p = new ProcessHelper();
   */
  constructor() {
    // Store the real platform so tests can restore it later.
    this.cachedPlatform = process.platform;
    // Store the real navigator so tests can restore it later.
    // Use global.navigator to support Node test environments.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.cachedNavigator = (global as any).navigator;
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
   * Passing no argument will set the platform to `undefined`, allowing
   * tests to simulate a missing/unknown platform.
   *
   * @param {string | undefined} [platform] - The platform string to apply (e.g. 'win32') or `undefined`.
   * @example
   * const p = new ProcessHelper();
   * p.setPlatform('darwin');
   * p.setPlatform(); // sets platform to undefined
   */
  public setPlatform(platform?: string) {
    // Define the property directly so it can be redefined in later tests.
    Object.defineProperty(process, 'platform', {
      value: platform,
      configurable: true, // Allow subsequent redefinition by tests that call setPlatform again.
      writable: true,
    });
  }

  /**
   * Set the global `navigator` object for the duration of a test.
   * Passing no argument sets `navigator` to `undefined`.
   *
   * @param obj - The object to set as `global.navigator` or `undefined`.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public setNavigator(obj?: any) {
    Object.defineProperty(global, 'navigator', { value: obj, configurable: true, writable: true });
  }

  /**
   * Restore the original `navigator` value cached at construction.
   */
  public resetNavigator() {
    this.setNavigator(this.cachedNavigator);
  }
}

export default ProcessHelper;
