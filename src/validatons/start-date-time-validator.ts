import { body, check } from 'express-validator';
import moment from 'moment';

const startDateTimeValidator = check(
  'startDateTime',
  'INVALID_START_DATE_TIME'
).custom((value: string) => {
  if (!moment(value).isValid()) return false;

  return moment(value).diff(moment(), 'hours') >= 0;
});

export default startDateTimeValidator;
