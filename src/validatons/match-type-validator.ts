import { MatchType } from '../domain/match-type';
import { body } from 'express-validator';

const matchTypeValidator = body('matchType')
  .custom((value: string) => {
    const isValueInEnum = (Object.values(MatchType) as string[]).includes(
      value
    );

    if (isValueInEnum) {
      return true;
    } else {
      return false;
    }
  })
  .withMessage('INVALID_MATCH_TYPE');

export default matchTypeValidator;
