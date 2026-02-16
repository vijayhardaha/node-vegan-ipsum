# 🌱 Vegan Ipsum – Ethical Placeholder Text Generator

![NPM Version](https://img.shields.io/npm/v/vegan-ipsum?style=flat-square&label=npm%20package) ![Node Current](https://img.shields.io/node/v/vegan-ipsum?style=flat-square&label=node%20version) ![NPM License](https://img.shields.io/npm/l/vegan-ipsum?style=flat-square)

**`vegan-ipsum`** is a JavaScript module that generates vegan-themed placeholder text. It works in Node.js, browsers, and React Native.

Use it for vegan blogs, animal rights projects, or any site where you want meaningful filler text instead of "lorem ipsum."

Based on the [`lorem-ipsum`](https://github.com/knicklabs/lorem-ipsum.js) project by Nickolas Kenyeres.

## Installation

```bash
npm i vegan-ipsum
```

## Using the Class

```js
import { VeganIpsum } from "vegan-ipsum";
// const VeganIpsum = require("vegan-ipsum").VeganIpsum;

const vegan = new VeganIpsum({
  sentencesPerParagraph: { min: 4, max: 8 },
  wordsPerSentence: { min: 4, max: 16 },
});

vegan.generateWords(1);
vegan.generateSentences(5);
vegan.generateParagraphs(7);
```

---

## Using the Function

`vegan-ipsum` also supports a functional interface for simple, quick usage:

```js
import { VeganIpsum } from "vegan-ipsum";

VeganIpsum(); // generates one sentence
```

Customizable options:

```js
VeganIpsum({
  count: 1,
  format: "plain", // "plain" or "html"
  paragraphLowerBound: 3,
  paragraphUpperBound: 7,
  sentenceLowerBound: 5,
  sentenceUpperBound: 15,
  random: Math.random,
  suffix: "\n",
  units: "sentences", // "words", "sentences", or "paragraphs"
});
```

---

## Using the CLI

`vegan-ipsum` comes with a CLI tool to generate vegan text right from your terminal.

```bash
npm i -g vegan-ipsum
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

## Project

This package is part of a small ecosystem around vegan-themed placeholder text. Related projects and integrations:

- JSON API: https://veganipsum.vercel.app/json-api
- VS Code extension: https://veganipsum.vercel.app/vscode-extension


## License

This project is licensed under the [MIT License](./LICENSE).
© 2025 Vijay Hardaha
