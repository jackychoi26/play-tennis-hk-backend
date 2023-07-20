import { body } from 'express-validator';

const descriptionValidator = body('description')
  .custom((value: string) => {
    const regex = /^.{0,100}$/;
    const isDescriptionValid = regex.test(value);

    if (isDescriptionValid) {
      return true;
    } else {
      return false;
    }
  })
  .withMessage('INVALID_DESCRIPTION');

export default descriptionValidator;
