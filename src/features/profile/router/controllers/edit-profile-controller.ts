import { Request, Response } from 'express';
import EditProfile from '../../domain/usecases/edit-profile';
import { TokenData } from '../../../../core/jwt-helper';

export default class EditProfileController {
  constructor() {}

  async handle(req: Request, res: Response) {
    const { ntrpLevel, description, telegram, whatsapp, signal } = req.body;

    if (!ntrpLevel && !description && !telegram && !whatsapp && !signal) {
      res.status(400).json({ errorMessage: 'Invalid edit profile request' });
    }

    if (!req.currentUser?.id) {
      return res.status(401).json({ errorMessage: 'Unauthorized access' });
    }

    const editProfile = new EditProfile();

    try {
      const result = await editProfile.execute({
        id: req.currentUser.id,
        ntrpLevel,
        telegram,
        whatsapp,
        signal
      });

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
