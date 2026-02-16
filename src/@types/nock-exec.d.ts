/**
 * Mocks the execution of a shell command.
 *
 * @param {string} command - The shell command to mock.
 * @returns {any} The mocked result of the command execution.
 */
declare module "nock-exec" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function nockExec(command: string): any;
  export = nockExec;
}
