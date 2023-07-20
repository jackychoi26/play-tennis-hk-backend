import { body } from 'express-validator';

const signalValidator = body('signal')
  .custom((value: string) => {
    const regex = /^.{0,20}$/;
    const isSignalValid = regex.test(value);

    if (isSignalValid) {
      return true;
    } else {
      return false;
    }
  })
  .withMessage('INVALID_SIGNAL');

export default signalValidator;
