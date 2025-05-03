# vegan-ipsum

🌱 **Vegan Ipsum – Ethical Placeholder Text Generator** 🌱

`vegan-ipsum` is a JavaScript module for generating vegan-themed placeholder text. Inspired by the popular [`lorem-ipsum`](https://github.com/knicklabs/lorem-ipsum) project, this tool is ideal for designers, developers, and creators who want ethically themed dummy text with a compassionate twist.

Whether you’re building a vegan blog, animal rights project, or simply want to replace “lorem ipsum” with meaningful filler, `vegan-ipsum` is for you.

Compatible with **Node.js**, **browsers**, and **React Native**.

> 🙏 Thanks to [`lorem-ipsum`](https://github.com/knicklabs/lorem-ipsum) by Nickolas Kenyeres for the original work we’ve lovingly adapted from.

---

## Installation

```bash
npm i vegan-ipsum
```

---

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
vegan-ipsum 1 paragraph
vegan-ipsum 2 paragraphs --copy
vegan-ipsum 2 paragraphs --format html
```

---

## License

This project is licensed under the [ISC License](./LICENSE).
© 2025 Vijay Hardaha

Based on `lorem-ipsum` by Nickolas Kenyeres – thank you for the foundation and inspiration.
