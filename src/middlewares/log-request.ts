import { Request, Response, NextFunction } from 'express';
import logger from '../core/logger';
import _ from 'lodash';

const logRequest = (req: Request, res: Response, next: NextFunction) => {
  const headers = _.cloneDeep(req.headers);
  const body = _.cloneDeep(req.body);

  delete headers['authorization'];
  delete body['password'];
  delete body['accessToken'];

  const logObject = {
    type: 'request',
    headers,
    body
  };

  console.dir(logObject);
  logger.info(logObject);
  next();
};

export default logRequest;
