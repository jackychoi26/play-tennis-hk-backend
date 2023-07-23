import { Request, Response } from 'express';
import UnauthorizedError from '../../../../core/errors/unauthorized-error';
import GetTennisMatchByUserId from '../../domain/usecases/get-tennis-matches-by-user-id';
import logger from '../../../../core/logger';

export default class GetTennisMatchesByUserIdController {
  constructor() {}

  async handle(req: Request, res: Response) {
    const getTennisMatchByUserId = new GetTennisMatchByUserId();

    if (!req.currentUser?.id) {
      throw new UnauthorizedError();
    }

    const result = await getTennisMatchByUserId.execute({
      userId: req.currentUser.id
    });

    try {
      switch (result.message) {
        case 'GET_TENNIS_MATCHES_BY_USER_ID_SUCCESS':
          return res.status(200).json(result);
        case 'GET_TENNIS_MATCHES_BY_USER_ID_FAILURE':
          return res.status(400).json(result);
      }
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
