import { body } from 'express-validator';

const ageValidator = body('age')
  .custom((value: number) => {
    if (typeof value !== 'number') return false;
    const isAgeValid = value > 12 && value < 100;
    return isAgeValid;
  })
  .optional()
  .withMessage('INVALID_AGE');

export default ageValidator;
