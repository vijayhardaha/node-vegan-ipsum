/* eslint-disable no-undef */
// Simple ESM consumer test
import * as pkg from "../../dist/index.mjs";
console.log("ESM keys:", Object.keys(pkg));
if (typeof pkg.veganIpsum === "function") {
	console.log("veganIpsum() ->", pkg.veganIpsum());
} else if (pkg.default && typeof pkg.default.veganIpsum === "function") {
	console.log("default.veganIpsum() ->", pkg.default.veganIpsum());
} else {
	console.error("veganIpsum not found in ESM exports");
}
