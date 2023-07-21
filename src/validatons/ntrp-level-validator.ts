import { body, check } from 'express-validator';

const ntrpLevelValidator = check('ntrpLevel', 'INVALID_NTRP_LEVEL')
  .custom((value: string) => {
    if (typeof value !== 'number') return false;

    const validNumbers = [
      1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7
    ];

    return validNumbers.includes(value);
  })
  .optional();

export default ntrpLevelValidator;
