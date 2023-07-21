import { body } from 'express-validator';

const whatsappValidator = body('whatsapp')
  .custom((value: string) => {
    if (typeof value !== 'string') return false;
    const regex = /^.{0,20}$/;
    const isWhatsappValid = regex.test(value);
    return isWhatsappValid;
  })
  .optional()
  .withMessage('INVALID_WHATSAPP');

export default whatsappValidator;
