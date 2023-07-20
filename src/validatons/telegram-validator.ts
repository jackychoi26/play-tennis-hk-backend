import { body } from 'express-validator';

const telegramValidator = body('telegram')
  .custom((value: string) => {
    const regex = /^.{0,20}$/;
    const isTelegramValid = regex.test(value);

    if (isTelegramValid) {
      return true;
    } else {
      return false;
    }
  })
  .withMessage('INVALID_TELEGRAM');

export default telegramValidator;
