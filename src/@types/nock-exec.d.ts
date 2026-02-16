/**
 * Mocks the execution of a shell command.
 *
 * @param {string} command - The shell command to mock.
 * @returns {any} The mocked result of the command execution.
 */
declare module "nock-exec" {
  function nockExec(command: string): Record<string, unknown>;
  export = nockExec;
}
