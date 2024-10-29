export class EmailAlreadyBeingUsedError extends Error {
  constructor() {
    super('E-mail already being used.')
  }
}
