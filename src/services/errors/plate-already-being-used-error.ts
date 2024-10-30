export class PlateAlreadyBeingUsedError extends Error {
  constructor() {
    super('Plate already being used.')
  }
}
