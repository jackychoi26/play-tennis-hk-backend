import { Request, Response, NextFunction } from 'express';
import CustomError from '../core/errors/custom-error';
import InternalError from '../core/errors/internal-error';

const errorHandler = (
  err: Error,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ message: err.message });
  } else if (err instanceof InternalError) {
    console.error('❌ Unhandled Error: ', err.message);

    return res
      .status(err.statusCode)
      .send({ message: 'Internal server error' });
  }

  console.error('❌ Unhandled Error: ', err);

  res.status(500).send({
    message: 'Internal server error'
  });
};

export default errorHandler;
