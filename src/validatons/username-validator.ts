import { body } from 'express-validator';

const usernameValidator = body('username')
  .custom((value: string) => {
    const usernameRegexp = /^[a-zA-Z0-9_]{4,12}$/;
    const isUsernameValid = usernameRegexp.test(value);

    if (isUsernameValid) {
      return Promise.resolve();
    } else {
      return Promise.reject();
    }
  })
  .withMessage('INVALID_USERNAME');

export default usernameValidator;
