import { Request, Response } from 'express';
import EditProfile from '../../domain/usecases/edit-profile';
import { TokenData } from '../../../../core/jwt-helper';
import UnauthorizedError from '../../../../core/errors/unauthorized-error';

export default class EditProfileController {
  constructor() {}

  async handle(req: Request, res: Response) {
    const {
      ntrpLevel,
      description,
      telegram,
      districts,
      whatsapp,
      signal,
      isProfilePublic
    } = req.body;

    if (
      !ntrpLevel &&
      !description &&
      !telegram &&
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

    const data = Object.fromEntries(
      Object.entries(req.body).filter(([_, value]) => value !== undefined)
    );

    const editProfileInput = Object.assign(
      {
        id: req.currentUser.id
      },
      ntrpLevel === undefined ? null : { ntrpLevel },
      telegram === undefined ? null : { telegram },
      districts === undefined ? null : { districts },
      isProfilePublic === undefined ? null : { isProfilePublic },
      whatsapp === undefined ? null : { whatsapp },
      signal === undefined ? null : { signal }
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
      return res.status(500).json();
    }
  }
}

// It's declared multiple times because of some typescript compile issue
// removing this will throw compile error
declare global {
  namespace Express {
    interface Request {
      currentUser?: TokenData;
    }
  }
}
