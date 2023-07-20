import { body } from 'express-validator';

const whatsappValidator = body('whatsapp')
  .custom((value: string) => {
    const regex = /^.{0,20}$/;
    const isWhatsappValid = regex.test(value);

    if (isWhatsappValid) {
      return true;
    } else {
      return false;
    }
  })
  .withMessage('INVALID_WHATSAPP');

export default whatsappValidator;
