import { District } from '../domain/district';
import { body } from 'express-validator';

const districtValidator = body('district')
  .custom((value: string) => {
    if (typeof value !== 'string') return false;
    const isValueInEnum = (Object.values(District) as string[]).includes(value);
    return isValueInEnum;
  })
  .optional()
  .withMessage('INVALID_DISTRICT');

export default districtValidator;
