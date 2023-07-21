import { body } from 'express-validator';

const isProfilePublicValidator = body('isProfilePublic')
  .custom((value: boolean) => {
    return typeof value === 'boolean';
  })
  .optional()
  .withMessage('INVALID_IS_PROFILE_PUBLIC');

export default isProfilePublicValidator;
