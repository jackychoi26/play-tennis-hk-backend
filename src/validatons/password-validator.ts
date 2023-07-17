import { body } from 'express-validator';

const passwordValidator = body('password')
  .custom((value: string) => {
    const passwordRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/;

    const isPasswordValid = passwordRegexp.test(value);

    if (isPasswordValid) {
      return Promise.resolve();
    } else {
      return Promise.reject();
    }
  })
  .withMessage('Invalid password');

export default passwordValidator;
