import { body } from 'express-validator';

const signalValidator = body('signal')
  .custom((value: string) => {
    if (typeof value !== 'string') return false;
    const regex = /^.{0,20}$/;
    const isSignalValid = regex.test(value);
    return isSignalValid;
  })
  .optional()
  .withMessage('INVALID_SIGNAL');

export default signalValidator;
