import { body } from 'express-validator';

const descriptionValidator = body('description')
  .custom((value: string) => {
    if (typeof value !== 'string') return false;
    const regex = /^.{0,100}$/;
    const isDescriptionValid = regex.test(value);
    return isDescriptionValid;
  })
  .optional()
  .withMessage('INVALID_DESCRIPTION');

export default descriptionValidator;
