import { MatchType } from '../domain/match-type';
import { body } from 'express-validator';

const matchTypeValidator = body('matchType')
  .custom((value: string) => {
    if (typeof value !== 'string') return false;

    const isValueInEnum = (Object.values(MatchType) as string[]).includes(
      value
    );

    return isValueInEnum;
  })
  .optional()
  .withMessage('INVALID_MATCH_TYPE');

export default matchTypeValidator;
