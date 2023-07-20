import { body } from 'express-validator';

const whatsappValidator = body('whatsapp')
  .custom((value: string) => {
    const regex = /^.{0,20}$/;
    const isWhatsappValid = regex.test(value);

    if (isWhatsappValid) {
      return Promise.resolve();
    } else {
      return Promise.reject();
    }
  })
  .withMessage('INVALID_WHATSAPP');

export default whatsappValidator;
