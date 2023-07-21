import { body, check } from 'express-validator';

const usernameValidator = check('username', 'INVALID_USERNAME')
  .custom((value: string) => {
    if (typeof value !== 'string') return false;
    const usernameRegexp = /^[a-zA-Z0-9_]{4,12}$/;
    const isUsernameValid = usernameRegexp.test(value);
    return isUsernameValid;
  })
  .optional();

export default usernameValidator;
