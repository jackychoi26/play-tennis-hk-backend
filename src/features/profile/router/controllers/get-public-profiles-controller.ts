import { Request, Response } from 'express';
import GetPublicProfiles from '../../domain/usecases/get-public-profiles';

export default class GetPublicProfilesController {
  constructor() {}

  async handle(req: Request, res: Response) {
    try {
      const getPublicProfiles = new GetPublicProfiles();

      const result = await getPublicProfiles.execute();

      switch (result.message) {
        case 'GET_PUBLIC_PROFILES_SUCCESS':
          return res.status(200).json(result);
        case 'GET_PUBLIC_PROFILES_FAILURE':
          return res.status(400).json(result);
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json();
    }
  }
}
