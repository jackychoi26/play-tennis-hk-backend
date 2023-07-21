import { body } from 'express-validator';

const passwordValidator = body('password')
  .custom((value: string) => {
    if (typeof value !== 'string') return false;
    const passwordRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/;
    const isPasswordValid = passwordRegexp.test(value);
    return isPasswordValid;
  })
  .optional()
  .withMessage('INVALID_PASSWORD');

export default passwordValidator;
