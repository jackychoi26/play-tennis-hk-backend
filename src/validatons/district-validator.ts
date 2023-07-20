import { District } from '../domain/district';
import { body } from 'express-validator';

const districtValidator = body('district')
  .custom((value: string) => {
    const isValueInEnum = (Object.values(District) as string[]).includes(value);

    if (isValueInEnum) {
      return true;
    } else {
      return false;
    }
  })
  .withMessage('INVALID_DISTRICT');

export default districtValidator;
