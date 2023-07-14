import { Request, Response, NextFunction } from 'express';
import CustomError from '../core/errors/custom-error';
import InternalError from '../core/errors/internal-error';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errorMessage: err.message });
  } else if (err instanceof InternalError) {
    console.error('❌ Unhandled Error: ', err.message);
    return res
      .status(err.statusCode)
      .send({ errorMessage: 'Internal server error' });
  }

  console.error('❌ Unhandled Error: ', err);

  res.status(500).send({
    errorMessage: 'Something went wrong'
  });
};
