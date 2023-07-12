import { Request, Response } from 'express';
import GetTennisMatches from '../../domain/usecases/get-tennis-matches';

export class GetTennisMatchesController {
  constructor() {}

  async handle(req: Request, res: Response) {
    try {
      const result = await new GetTennisMatches().execute();

      switch (result.message) {
        case 'GET_TENNIS_MATCHES_SUCCESS':
          return res.status(200).json(result);
        case 'TENNIS_MATCHES_EMPTY':
          return res.status(404).json(result);
      }
    } catch (err) {}
  }
}
