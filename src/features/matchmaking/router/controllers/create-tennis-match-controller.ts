import { Request, Response } from 'express';
import UnauthorizedError from '../../../../core/errors/unauthorized-error';
import CreateTennisMatch from '../../domain/usecases/create-tennis-match';
import { MatchType } from '../../../../domain/match-type';
import { District } from '../../../../domain/district';
import logger from '../../../../core/logger';
import moment from 'moment';

export default class CreateTennisMatchesController {
  constructor() {}

  async handle(req: Request, res: Response) {
    const createTennisMatch = new CreateTennisMatch();

    const ntrpLevel: number = req.body.ntrpLevel;
    const startDateTime: Date = moment(req.body.startDateTime).toDate();
    const endDateTime: Date = moment(req.body.endDateTime).toDate();
    const district: District = req.body.district;
    const matchType: MatchType = req.body.matchType;
    const court: string = req.body.court;
    const remarks: string | undefined = req.body.remarks;

    if (!req.currentUser?.id) {
      throw new UnauthorizedError();
    }

    const createTennisMatchInput = Object.assign(
      {
        userId: req.currentUser.id,
        ntrpLevel,
        startDateTime,
        endDateTime,
        district,
        matchType,
        court
      },
      remarks === undefined ? null : { remarks }
    );

    const result = await createTennisMatch.execute(createTennisMatchInput);

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
      logger.err(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
