import { Request, Response } from 'express';
import GetTennisMatches from '../../domain/usecases/get-tennis-matches';
import logger from '../../../../core/logger';

export class GetTennisMatchesController {
  constructor() {}

  async handle(req: Request, res: Response) {
    try {
      const offsetQuery = req.query.offset as string;
      const parsedOffset = parseInt(offsetQuery);
      const offset = isNaN(parsedOffset) ? 0 : parsedOffset;

      const result = await new GetTennisMatches().execute({ offset });

      switch (result.message) {
        case 'GET_TENNIS_MATCHES_SUCCESS':
          return res.status(200).json(result);
        case 'GET_TENNIS_MATCHES_FAILURE':
          return res.status(500).json(result);
      }
    } catch (err) {
      logger.error(err);
      res.status(500).send({ message: 'Internal server error' });
    }
  }
}
