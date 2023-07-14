export default class InternalError extends Error {
  statusCode = 500;

  constructor(logMessage: string) {
    super(logMessage);

    Object.setPrototypeOf(this, InternalError.prototype);
  }
}
