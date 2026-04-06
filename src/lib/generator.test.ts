import Generator from './generator';

/**
 * Unit tests for the Generator class and its methods, validating random
 * generation and boundary conditions across representative scenarios.
 */
describe('generator', () => {
  let generator: Generator;

  /**
   * Initialize a new `Generator` instance before each test.
   */
  beforeEach(() => {
    generator = new Generator();
  });

  /**
   * Test case: Should throw an error if instantiated with invalid paragraph bounds.
   */
  test('Should throw an error if instantiated with non-sensical paragraph bounds', () => {
    try {
      generator = new Generator({ sentencesPerParagraph: { max: 1, min: 7 } });
    } catch (error) {
      // Expect an error to be thrown with a specific message
      expect(error).toBeDefined();
      // Expect the error message to indicate that the minimum number of sentences per paragraph cannot exceed the maximum
      expect((error as Error).message).toEqual(
        `Minimum number of sentences per paragraph (7) cannot exceed maximum (1).`
      );
    }
  });

  /**
   * Test case: Should throw an error if instantiated with invalid sentence bounds.
   */
  test('Should throw an error if instantiated with non-sensical sentence bounds', () => {
    try {
      generator = new Generator({ wordsPerSentence: { max: 1, min: 7 } });
    } catch (error) {
      // Expect an error to be thrown with a specific message
      expect(error).toBeDefined();
      // Expect the error message to indicate that the minimum number of words per sentence cannot exceed the maximum
      expect((error as Error).message).toEqual(`Minimum number of words per sentence (7) cannot exceed maximum (1).`);
    }
  });

  /**
   * Test case: Should use `Math.random` as the default pseudo-random number generator (PRNG).
   */
  test('Should use Math.random as the default PRNG', () => {
    generator = new Generator();
    // Expect the random function used by the generator to be Math.random when no custom PRNG is provided
    expect(generator.random).toEqual(Math.random);
  });

  /**
   * Test case: Should use a custom PRNG if provided.
   */
  test('Should use a custom PRNG if provided with one', () => {
    const random = vi.fn();
    generator = new Generator({ random });
    // Expect the random function used by the generator to be the custom random function provided in the options
    expect(generator.random).toEqual(random);
  });

  /**
   * Tests for the `generateRandomInteger` method.
   */
  describe('generateRandomInteger', () => {
    /**
     * Test case: Should generate an exact number when min and max are equal.
     */
    test('Should generate an exact number given an equal min and max', () => {
      // Expect the generated random integer to equal the specified number when min and max are the same
      expect(generator.generateRandomInteger(7, 7)).toEqual(7);
    });

    /**
     * Test case: Should generate a random number between the min and max.
     */
    test('Should generate a random number between the min and max', () => {
      const min = 1;
      const max = 3;
      for (let i = 0; i < 100; i++) {
        const result = generator.generateRandomInteger(min, max);
        // Expect the generated random integer to be between the specified min and max values
        expect(result <= max).toEqual(true);
        expect(result >= min).toEqual(true);
      }
    });
  });

  /**
   * Tests for the `generateRandomWords` method.
   */
  describe('generateRandomWords', () => {
    /**
     * Test case: Should generate a specific number of random words.
     */
    test('Should generate a specific number of random words', () => {
      const result = generator.generateRandomWords(5);
      // Expect the generated string to contain the specified number of words when generateRandomWords is called with a count of 5
      expect(result.split(' ')).toHaveLength(5);
    });

    /**
     * Test case: Should generate a random number of words between the min and max.
     */
    test('Should generate a random number of words between the min and max', () => {
      const min = 2;
      const max = 4;
      generator = new Generator({ wordsPerSentence: { max, min } });
      for (let i = 0; i < 100; i++) {
        const result = generator.generateRandomWords();
        const words = result.split(' ');
        // Expect the number of words in the generated string to be between the specified min and max values when generateRandomWords is called without arguments and the wordsPerSentence option is set
        expect(words.length <= max).toEqual(true);
        expect(words.length >= min).toEqual(true);
      }
    });
  });

  /**
   * Tests for the `generateRandomSentence` method.
   */
  describe('generateRandomSentence', () => {
    /**
     * Test case: Should generate a sentence that ends with a period.
     */
    test('Should generate a sentence that ends with a period', () => {
      const result = generator.generateRandomSentence();
      // Expect the generated sentence to end with a period
      expect(result.slice(-1)).toEqual('.');
    });

    /**
     * Test case: Should generate a sentence with a specific number of words.
     */
    test('Should generate a random sentence that has a specific number of words', () => {
      const result = generator.generateRandomSentence(10);
      // Expect the generated sentence to contain the specified number of words when generateRandomSentence is called with a count of 10
      expect(result.split(' ')).toHaveLength(10);
    });

    /**
     * Test case: Should generate a sentence with a number of words between min and max.
     */
    test('Should generate a random sentence that has a number of words between min and max', () => {
      const min = 3;
      const max = 5;
      generator = new Generator({ wordsPerSentence: { max, min } });
      for (let i = 0; i < 100; i++) {
        const result = generator.generateRandomSentence();
        const words = result.split(' ');
        // Expect the number of words in the generated sentence to be between the specified min and max values when generateRandomSentence is called without arguments and the wordsPerSentence option is set
        expect(words.length <= max).toEqual(true);
        expect(words.length >= min).toEqual(true);
      }
    });
  });

  /**
   * Tests for the `generateRandomParagraph` method.
   */
  describe('generateRandomParagraph', () => {
    /**
     * Test case: Should generate a paragraph with a specific number of sentences.
     */
    test('Should generate a random paragraph with a specific number of sentences', () => {
      const result = generator.generateRandomParagraph(10);
      // Expect the generated paragraph to contain the specified number of sentences when generateRandomParagraph is called with a count of 10
      expect(result.split('. ')).toHaveLength(10);
    });

    /**
     * Test case: Should generate a paragraph with a number of sentences between min and max.
     */
    test('Should generate a random paragraph with a number of sentences between min and max', () => {
      const min = 14;
      const max = 16;
      generator = new Generator({ sentencesPerParagraph: { max, min } });
      for (let i = 0; i < 100; i++) {
        const result = generator.generateRandomParagraph();
        const sentences = result.split('. ');
        // Expect the number of sentences in the generated paragraph to be between the specified min and max values when generateRandomParagraph is called without arguments and the sentencesPerParagraph option is set
        expect(sentences.length <= max).toEqual(true);
        expect(sentences.length >= min).toEqual(true);
      }
    });
  });
});
