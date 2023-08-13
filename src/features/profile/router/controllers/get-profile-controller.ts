import { Request, Response } from 'express';
import UnauthorizedError from '../../../../core/errors/unauthorized-error';
import GetProfile from '../../domain/usecases/get-profile';
import logger from '../../../../core/logger';
import { TokenData } from '../../../../core/jwt-helper';

export default class GetProfileController {
  constructor() {}

  async handle(req: Request, res: Response) {
    if (!req.currentUser?.id) {
      throw new UnauthorizedError();
    }

    const getProfile = new GetProfile();

    try {
      const result = await getProfile.execute({
        id: req.currentUser.id
      });

      switch (result.message) {
        case 'GET_PROFILE_SUCCESS':
          return res.status(200).json(result);
        case 'GET_PROFILE_FAILURE':
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
