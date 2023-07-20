import { body } from 'express-validator';

const telegramValidator = body('telegram')
  .custom((value: string) => {
    const regex = /^.{0,20}$/;
    const isTelegramValid = regex.test(value);

    if (isTelegramValid) {
      return Promise.resolve();
    } else {
      return Promise.reject();
    }
  })
  .withMessage('INVALID_TELEGRAM');

export default telegramValidator;
