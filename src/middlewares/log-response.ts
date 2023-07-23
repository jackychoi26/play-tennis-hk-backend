import { Request, Response, NextFunction } from 'express';
import logger from '../core/logger';
import _ from 'lodash';
import InternalError from '../core/errors/internal-error';

const logResponse = (req: Request, res: Response, next: NextFunction) => {
  const oldSend = res.send;
  res.send = (data: any) => {
    try {
      const newData = JSON.parse(_.cloneDeep(data));

      delete newData['accessToken'];

      const logObject = {
        type: 'response',
        data: newData
      };

      logger.info(logObject);
      res.send = oldSend;
      return res.send(data);
    } catch (err) {
      logger.error('Throw error when trying to parse the response body', err);
      throw new InternalError('Server went wrong');
    }
  };

  next();
};

export default logResponse;
