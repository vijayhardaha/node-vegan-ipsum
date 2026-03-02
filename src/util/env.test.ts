import { SUPPORTED_PLATFORMS } from "../constants";

import { isNode, isReactNative, isWindows } from ".";
import ProcessHelper from "../../tests/util/ProcessHelper";

/**
 * Unit tests for environment detection utilities ensuring Node, React Native,
 * and Windows detection behave correctly under simulated globals.
 */
describe("environment utilities", () => {
	/**
	 * Unit tests for the `isNode` function.
	 */
	describe("isNode", () => {
		/**
		 * Test case: Should return true if the code is executing in a Node.js environment.
		 */
		test("returns true when running in Node.js", () => {
			// Expect `isNode` to return true when running in a Node.js environment
			expect(isNode()).toEqual(true);
		});
	});

	/**
	 * Unit tests for the `isReactNative` function.
	 */
	describe("isReactNative", () => {
		// Use the shared ProcessHelper to mock and restore `navigator`.
		const process = new ProcessHelper();

		/**
		 * Reset the navigator to its original state after each test to avoid side effects.
		 * This ensures that changes to `navigator` in one test do not affect others.
		 */
		afterEach(() => {
			process.resetNavigator();
		});

		/**
		 * Test case: Should return false if the navigator object is not defined or does not indicate React Native.
		 */
		test("returns false when not React Native", () => {
			process.setNavigator(undefined);
			// Expect `isReactNative` to return false when `navigator` is undefined
			expect(isReactNative()).toEqual(false);
		});

		/**
		 * Test case: Should return true if the navigator object indicates a React Native environment.
		 */
		test("returns true when navigator.product === 'ReactNative'", () => {
			process.setNavigator({ product: "ReactNative" });
			// Expect `isReactNative` to return true when `navigator.product` is set to 'ReactNative'
			expect(isReactNative()).toEqual(true);
		});

		/**
		 * Test case: Should return false if accessing navigator throws an error.
		 * The try/catch in `isReactNative` should catch and return false instead of bubbling.
		 */
		test("returns false when navigator access throws", () => {
			Object.defineProperty(global, "navigator", {
				get: () => {
					throw new Error("navigator failure");
				},
				configurable: true,
			});
			expect(isReactNative()).toEqual(false);
		});
	});

	/**
	 * Unit tests for the `isWindows` function.
	 */
	describe("isWindows", () => {
		// Use the shared ProcessHelper to mock and restore `process.platform`.
		const process = new ProcessHelper();

		/**
		 * Reset the platform to its original state after each test to avoid side effects.
		 * This ensures that changes to `process.platform` in one test do not affect others.
		 */
		afterEach(() => {
			process.resetPlatform();
		});

		/**
		 * Test case: Should return false if the platform is not Windows.
		 */
		test("returns false for non-Windows platform", () => {
			process.setPlatform(SUPPORTED_PLATFORMS.DARWIN);
			// Expect `isWindows` to return false when `process.platform` is set to 'darwin'
			expect(isWindows()).toEqual(false);
		});

		/**
		 * Test case: Should return true if the platform is Windows.
		 */
		test("returns true for Windows platform", () => {
			process.setPlatform(SUPPORTED_PLATFORMS.WIN32);
			// Expect `isWindows` to return true when `process.platform` is set to 'win32'
			expect(isWindows()).toEqual(true);
		});

		/**
		 * Test case: Should return false if the platform is undefined.
		 */
		test("returns false when platform undefined", () => {
			process.setPlatform(undefined);
			// Expect `isWindows` to return false when `process.platform` is undefined
			expect(isWindows()).toEqual(false);
		});

		/**
		 * Test case: Should return false if accessing `process.platform` throws an error.
		 * This triggers the catch block in `isWindows` ensuring safe failure.
		 */
		test("returns false when reading platform throws", () => {
			// directly patch the global process object (not the helper)
			Object.defineProperty(global.process, "platform", {
				get: () => {
					throw new Error("oh no");
				},
				configurable: true,
			});
			// Expect `isWindows` to return false when accessing `process.platform` throws an error
			expect(isWindows()).toEqual(false);
		});
	});
});
