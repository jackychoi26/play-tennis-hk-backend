import { body } from 'express-validator';

const descriptionValidator = body('description')
  .custom((value: string) => {
    const regex = /^.{0,100}$/;
    const isDescriptionValid = regex.test(value);

    if (isDescriptionValid) {
      return Promise.resolve();
    } else {
      return Promise.reject();
    }
  })
  .withMessage('Invalid description');

export default descriptionValidator;
