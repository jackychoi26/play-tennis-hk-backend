import { Request, Response } from 'express';
import DeleteTennisMatch from '../../domain/usecases/delete-tennis-match';

export default class DeleteTennisMatchesController {
  constructor() {}

  async handle(req: Request, res: Response) {
    const deleteTennisMatch = new DeleteTennisMatch();

    const { tennisMatchId } = req.body;

    if (!req.currentUser?.id) {
      return res.status(401).json({ errorMessage: 'Unauthorized access' });
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
      return res.status(500).json({ errorMessage: 'Internal server error' });
    }
  }
}
