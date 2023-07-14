import CustomError from './custom-error';

export default class BadRequestError extends CustomError {
  statusCode = 400;

  constructor(reason: string) {
    super(reason);

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}
