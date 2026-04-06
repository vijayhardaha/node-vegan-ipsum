// Simple CommonJS consumer test
// eslint-disable-next-line @typescript-eslint/no-require-imports
const pkg = require('../../dist/index.cjs');
console.log('CJS exports:', Object.keys(pkg));
if (typeof pkg.veganIpsum === 'function') {
  console.log('veganIpsum() ->', pkg.veganIpsum());
} else if (pkg.default && typeof pkg.default.veganIpsum === 'function') {
  console.log('default.veganIpsum() ->', pkg.default.veganIpsum());
} else {
  console.error('veganIpsum not found in CJS exports');
}
