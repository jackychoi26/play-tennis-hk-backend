import { Request, Response } from 'express';
import DeleteTennisMatch from '../../domain/usecases/delete-tennis-match';
import UnauthorizedError from '../../../../core/errors/unauthorized-error';
import logger from '../../../../core/logger';

export default class DeleteTennisMatchesController {
  constructor() {}

  async handle(req: Request, res: Response) {
    const deleteTennisMatch = new DeleteTennisMatch();

    const tennisMatchId: number = req.body.tennisMatchId;

    if (!req.currentUser?.id) {
      throw new UnauthorizedError();
    }

    const result = await deleteTennisMatch.execute({
      tennisMatchId,
      userId: req.currentUser.id
    });

    try {
      switch (result.message) {
        case 'DELETE_TENNIS_MATCH_SUCCESS':
          return res.status(200).json(result);
        case 'DELETE_TENNIS_MATCH_FAILURE':
          return res.status(400).json(result);
      }
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
