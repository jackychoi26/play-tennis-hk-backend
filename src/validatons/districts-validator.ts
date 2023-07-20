import { District } from '../domain/district';
import { body } from 'express-validator';

const districtsValidator = body('districts')
  .custom((values: string[], { req }) => {
    // To make sure this is of type `string[]`
    if (
      !(
        Array.isArray(values) &&
        values.every((item) => typeof item === 'string')
      )
    ) {
      return false;
    }

    if (values === undefined) return false;

    // TODO: move this to system param
    if (values.length > 5 || values.length < 1) return false;

    const hasInvalidValue = values.some((value) => {
      const isValueInEnum = (Object.values(District) as string[]).includes(
        value
      );

      return !isValueInEnum;
    });

    if (hasInvalidValue) {
      return false;
    }

    return true;
  })
  .withMessage('INVALID_DISTRICTS');

export default districtsValidator;
