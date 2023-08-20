import { Request, Response } from 'express';
import UnauthorizedError from '../../../../core/errors/unauthorized-error';
import logger from '../../../../core/logger';
import { TokenData } from '../../../../core/jwt-helper';
import RegisterPushToken from '../../domain/usecases/register-push-token';

export default class RegisterPushTokenController {
  constructor() {}

  async handle(req: Request, res: Response) {
    const pushToken: string = req.body.pushToken;

    if (!req.currentUser?.id) {
      throw new UnauthorizedError();
    }

    const registerPushToken = new RegisterPushToken();

    try {
      const result = await registerPushToken.execute({
        id: req.currentUser.id,
        pushToken
      });

      switch (result.message) {
        case 'REGISTER_PUSH_TOKEN_SUCCESS':
          return res.status(200).json(result);
        case 'REGISTER_PUSH_TOKEN_FAILURE':
          return res.status(400).json(result);
      }
    } catch (err) {
      logger.error(err);
      console.error(err);
      return res.status(500).json();
    }
  }
}

// This is decalred many times because of compilation error bug
declare global {
  namespace Express {
    interface Request {
      currentUser?: TokenData;
    }
  }
}
