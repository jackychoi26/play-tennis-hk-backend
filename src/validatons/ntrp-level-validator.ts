import { body } from 'express-validator';

const ntrpLevelValidator = body('ntrpLevel')
  .custom((value: number) => {
    if (typeof value !== 'number') return Promise.reject();

    const validNumbers = [
      1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7
    ];

    if (validNumbers.includes(value)) {
      return Promise.resolve();
    } else {
      return Promise.reject();
    }
  })
  .withMessage('INVALID_NTRP_LEVEL');

export default ntrpLevelValidator;
