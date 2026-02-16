import { Option, program } from "commander";

import { veganIpsum } from "..";
import { FORMATS, FORMAT_PLAIN, REGEX } from "../constants";

import { DESCRIPTION, USAGE } from "./constants";
import { copyToClipboard, getVersion } from "./util";

/**
 * CLI program for generating vegan ipsum text.
 *
 * - Arguments:
 *   - `count`: The number of units to generate (e.g., words, sentences, or paragraphs).
 *   - `units`: The type of units to generate (e.g., "words", "sentences", or "paragraphs").
 *
 * - Options:
 *   - `-c, --copy`: Copies the generated text to the clipboard.
 *   - `-f, --format <format>`: Specifies the format of the output (e.g., "plain" or "html").
 */
program
  .version(getVersion())
  .usage(USAGE)
  .description(DESCRIPTION)
  .argument("count", "The number of units")
  .argument("units", "Words, sentences, or paragraphs")
  .option("-c --copy", "Copy")
  .addOption(new Option("-f --format <format>", "Format").choices(FORMATS).default(FORMAT_PLAIN))
  .action(
    /**
     * Action handler for the CLI program.
     *
     * @param {string} num - The number of units to generate (default: "1").
     * @param {"words" | "word" | "sentences" | "sentence" | "paragraphs" | "paragraph" | undefined} units - The type of units to generate (default: "sentence").
     */
    (num: string = "1", units: "words" | "sentences" | "paragraphs" | undefined = "sentences") => {
      if (REGEX.UNITS.test(units) === false) {
        console.error(`${units} is not valid. Choose from paragraph(s), sentence(s), or word(s).`);
        process.exit(1);
      }

      const count = parseInt(num, 10);
      if (!count || count < 1) {
        console.error(`${count} is not valid. Choose a number greater than 1.`);
        process.exit(1);
      }

      const output = veganIpsum({
        count,
        format: program.getOptionValue("format"),
        units,
      });

      console.log(output);

      if (program.getOptionValue("copy") === true) {
        copyToClipboard(output)
          .then(() => {
            console.log("");

            console.log("✓ copied");
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    }
  );

program.parse(process.argv);
