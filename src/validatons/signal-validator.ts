import { body } from 'express-validator';

const signalValidator = body('signal')
  .custom((value: string) => {
    const regex = /^.{0,20}$/;
    const isSignalValid = regex.test(value);

    if (isSignalValid) {
      return Promise.resolve();
    } else {
      return Promise.reject();
    }
  })
  .withMessage('Invalid signal');

export default signalValidator;
