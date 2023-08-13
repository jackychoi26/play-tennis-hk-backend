import { Request, Response } from 'express';
import EditProfile from '../../domain/usecases/edit-profile';
import UnauthorizedError from '../../../../core/errors/unauthorized-error';
import { District } from '../../../../domain/district';
import logger from '../../../../core/logger';
import { TokenData } from '../../../../core/jwt-helper';

export default class EditProfileController {
  constructor() {}

  async handle(req: Request, res: Response) {
    const ntrpLevel: number | undefined = req.body.ntrpLevel;
    const description: string | undefined = req.body.description;
    const telegram: string | undefined = req.body.telegram;
    const age: string | number = req.body.age;
    const districts: District[] | undefined = req.body.districts;
    const whatsapp: string | undefined = req.body.whatsapp;
    const signal: string | undefined = req.body.signal;
    const isProfilePublic: boolean | undefined = req.body.isProfilePublic;

    if (
      !ntrpLevel &&
      !description &&
      !telegram &&
      !age &&
      !whatsapp &&
      !districts &&
      !signal &&
      !isProfilePublic
    ) {
      res.status(400).json({ message: 'MISSING_PARAM' });
    }

    if (!req.currentUser?.id) {
      throw new UnauthorizedError();
    }

    const editProfile = new EditProfile();

    const editProfileInput = Object.assign(
      {
        id: req.currentUser.id
      },
      ntrpLevel === undefined ? null : { ntrpLevel },
      districts === undefined ? null : { districts },
      telegram === undefined || '' ? null : { telegram },
      age === undefined || '' ? null : { age },
      isProfilePublic === undefined ? null : { isProfilePublic },
      whatsapp === undefined || '' ? null : { whatsapp },
      description === undefined || '' ? null : { description },
      signal === undefined || '' ? null : { signal }
    );

    try {
      const result = await editProfile.execute(editProfileInput);

      switch (result.message) {
        case 'EDIT_PROFILE_SUCCESS':
          return res.status(200).json(result);
        case 'EDIT_PROFILE_FAILURE':
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
