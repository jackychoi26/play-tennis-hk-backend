import { Request, Response } from 'express';
import UnauthorizedError from '../../../../core/errors/unauthorized-error';
import CreateTennisMatch from '../../domain/usecases/create-tennis-match';
import { TokenData } from '../../../../core/jwt-helper';

export default class CreateTennisMatchesController {
  constructor() {}

  async handle(req: Request, res: Response) {
    const createTennisMatch = new CreateTennisMatch();

    const {
      ntrpLevel,
      startDateTime,
      endDateTime,
      district,
      matchType,
      court,
      remarks
    } = req.body;

    if (!req.currentUser?.id) {
      throw new UnauthorizedError();
    }

    const result = await createTennisMatch.execute({
      userId: req.currentUser.id,
      ntrpLevel,
      startDateTime,
      endDateTime,
      district,
      matchType,
      court,
      remarks
    });

    try {
      switch (result.message) {
        case 'CREATE_TENNIS_MATCH_SUCCESS':
          return res.status(200).json(result);
        case 'CREATE_TENNIS_MATCH_FAILURE':
        case 'MISSING_CONTACT_INFO_FAILURE':
        case 'TOO_MANY_MATCHES_CREATED_FAILURE':
          return res.status(400).json(result);
      }
    } catch (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
