import { body } from 'express-validator';

const ntrpLevelValidator = body('ntrpLevel')
  .custom((value: number) => {
    if (typeof value !== 'number') return Promise.reject();

    if (value < 1 || value > 7) {
      return Promise.reject();
    } else {
      return Promise.resolve();
    }
  })
  .withMessage('Invalid ntrp level');

export default ntrpLevelValidator;
