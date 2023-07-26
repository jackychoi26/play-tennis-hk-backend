import { check } from 'express-validator';
import moment from 'moment';

const endDateTimeValidator = check(
  'endDateTime',
  'INVALID_END_DATE_TIME'
).custom((value: string, { req }) => {
  if (!moment(value).isValid()) return false;

  const startDateTime = req.body.startDateTime;

  if (!moment(value).isSame(startDateTime, 'day')) return false;

  return moment(value).isAfter(startDateTime, 'hours');
});

export default endDateTimeValidator;
