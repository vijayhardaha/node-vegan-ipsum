/**
 * Determines if the current runtime environment is React Native.
 *
 * @returns {boolean} `true` if the runtime is React Native, otherwise `false`.
 */
const isReactNative = (): boolean => {
  let isReactNativeResult: boolean = false;

  try {
    isReactNativeResult = navigator.product === "ReactNative";
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    isReactNativeResult = false;
  }

  return isReactNativeResult;
};

export default isReactNative;
