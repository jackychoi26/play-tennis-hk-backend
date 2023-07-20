import CustomError from './custom-error';

export default class UnauthorizedError extends CustomError {
  statusCode = 401;

  constructor(reason?: string) {
    super(reason ?? 'UNAUTHORIZED_ACCESS');

    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}
