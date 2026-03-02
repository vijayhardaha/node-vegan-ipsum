/* eslint-disable @typescript-eslint/no-require-imports */
// CJS interop check (default vs named)
const pkg = require("../../dist/index.cjs");
const main = pkg.default ?? pkg;
console.log("interop main keys:", Object.keys(main));
console.log(
	"has veganIpsum as function?",
	typeof main.veganIpsum === "function"
);
if (typeof main.VeganIpsum === "function")
	console.log("VeganIpsum is a constructor");
else console.log("VeganIpsum not found or not a function");
