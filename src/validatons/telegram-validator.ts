import { body } from 'express-validator';

const telegramValidator = body('telegram')
  .custom((value: string) => {
    if (typeof value !== 'string') return false;
    const regex = /^.{0,20}$/;
    const isTelegramValid = regex.test(value);
    return isTelegramValid;
  })
  .optional()
  .withMessage('INVALID_TELEGRAM');

export default telegramValidator;
