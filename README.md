# 🌱 Vegan Ipsum – Ethical Placeholder Text Generator

![NPM Version](https://img.shields.io/npm/v/vegan-ipsum?style=flat-square&label=npm%20package) ![Node Current](https://img.shields.io/node/v/vegan-ipsum?style=flat-square&label=node%20version) ![NPM License](https://img.shields.io/npm/l/vegan-ipsum?style=flat-square)

**`vegan-ipsum`** is a JavaScript module that generates vegan-themed placeholder text. It works in Node.js, browsers, and React Native.

Use it for vegan blogs, animal rights projects, or any site where you want meaningful filler text instead of "lorem ipsum."

Based on the [`lorem-ipsum`](https://github.com/knicklabs/lorem-ipsum.js) project by Nickolas Kenyeres.

## Major updates (v2.0.0)

- Node.js engine requirement bumped to >= 20.x (breaking change for older runtimes).
- Build system migrated to Vite; distribution now ships both ESM (`dist/index.mjs`) and CJS (`dist/index.cjs`).
- CLI is built as CJS with an injected shebang (`dist/bin/vegan-ipsum.bin.cjs`).
- Type declarations are emitted to `types/` via `vite-plugin-dts`.

> If v2.0.0 doesn't work for you, please use version `1.0.4`.

---

## Installation

```bash
npm install vegan-ipsum
```

---

## Using the Class

```js
import { VeganIpsum } from "vegan-ipsum";
// const VeganIpsum = require("vegan-ipsum").VeganIpsum;

const vegan = new VeganIpsum({ sentencesPerParagraph: { min: 4, max: 8 }, wordsPerSentence: { min: 4, max: 16 } });

// Generate words, sentences, or paragraphs and print them
const words = vegan.generateWords(6);
console.log(words);

const sentences = vegan.generateSentences(5);
console.log(sentences);

const paragraphs = vegan.generateParagraphs(2);
console.log(paragraphs);
```

---

## Using the Function

`vegan-ipsum` also provides a simple functional interface for quick use-cases.

ESM:

```js
import { veganIpsum } from "vegan-ipsum";

// generate one sentence (default)
console.log(veganIpsum());

// generate three sentences
console.log(veganIpsum({ count: 3, units: "sentences" }));

// generate two paragraphs, HTML formatted
console.log(veganIpsum({ count: 2, units: "paragraphs", format: "html" }));
```

CommonJS:

```js
const { veganIpsum } = require("vegan-ipsum");
console.log(veganIpsum({ count: 2 }));
```

Customizable options (shorthand): `count`, `units` (`words|sentences|paragraphs`), `format` (`plain|html`), `sentenceLowerBound`, `sentenceUpperBound`, `paragraphLowerBound`, `paragraphUpperBound`, `random`, and `suffix`.

---

## Using the CLI

`vegan-ipsum` comes with a CLI tool to generate vegan text right from your terminal.

```bash
npm install -g vegan-ipsum
```

### Examples:

```bash
vegan-ipsum 2 words
vegan-ipsum 3 sentences
vegan-ipsum 1 paragraphs
vegan-ipsum 2 paragraphs --copy
vegan-ipsum 2 paragraphs --format html
```

---

## Requirements

- Node.js: >= 20.x
- npm: >= 9.x

Ensure you are using a supported Node.js LTS. Recommended install via nvm:

```bash
nvm install --lts
nvm use --lts
```

---

## Project Ecosystem

Explore the wider vegan-ipsum ecosystem and integrations:

- **Project site & landing:** https://veganipsum.vercel.app — central hub with links and docs.
- **About:** https://veganipsum.vercel.app/about — background, goals, and maintainers.
- **JSON API:** https://veganipsum.vercel.app/json-api — programmatic endpoint for generating vegan ipsum.
- **VS Code extension:** https://veganipsum.vercel.app/vscode-extension — editor integration for inserting vegan ipsum.

---

## Contributing

Contributions are welcome! Please read our [Contributing Guide](docs/CONTRIBUTING.md) and [Code of Conduct](docs/CODE_OF_CONDUCT.md) before getting started.

---

## License

This project is licensed under the [MIT License](./LICENSE).\
Copyright © 2025 Vijay Hardaha
