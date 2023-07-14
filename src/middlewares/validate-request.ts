import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import BadRequestError from '../core/errors/bad-request-error';

const validateRequest = (req: Request, _: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new BadRequestError(errors.array()[0]?.msg ?? 'Something went wrong');
  }

  next();
};

export default validateRequest;
