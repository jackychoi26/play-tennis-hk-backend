import { CustomError } from './custom-error';

export class UserNotExistedError extends CustomError {
  statusCode = 404;

  constructor() {
    super('User not existed');

    Object.setPrototypeOf(this, UserNotExistedError.prototype);
  }
}
