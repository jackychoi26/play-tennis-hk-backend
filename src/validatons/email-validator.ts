import { body } from 'express-validator';

const emailValidator = body('email')
  .custom((value: string) => {
    if (typeof value !== 'string') return false;
    const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isEmailValid = emailRegexp.test(value);
    return isEmailValid;
  })
  .optional()
  .withMessage('INVALID_EMAIL_ADDRESS');

export default emailValidator;
