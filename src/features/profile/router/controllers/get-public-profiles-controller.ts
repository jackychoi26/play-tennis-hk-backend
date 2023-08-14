import { Request, Response } from 'express';
import GetPublicProfiles from '../../domain/usecases/get-public-profiles';
import logger from '../../../../core/logger';

export default class GetPublicProfilesController {
  constructor() {}

  async handle(req: Request, res: Response) {
    try {
      const offsetQuery = req.query.offset as string;
      const parsedOffset = parseInt(offsetQuery);
      const offset = isNaN(parsedOffset) ? 0 : parsedOffset;

      const getPublicProfiles = new GetPublicProfiles();

      const result = await getPublicProfiles.execute({ offset });

      switch (result.message) {
        case 'GET_PUBLIC_PROFILES_SUCCESS':
          return res.status(200).json(result);
        case 'GET_PUBLIC_PROFILES_FAILURE':
          return res.status(400).json(result);
      }
    } catch (err) {
      logger.error(err);
      console.error(err);
      return res.status(500).json();
    }
  }
}
