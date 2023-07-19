import { Request, Response } from 'express';
import { TokenData } from '../../../../core/jwt-helper';
import ChangePassword from '../../domain/usecases/change-password';

export default class ChangePasswordController {
  constructor() {}

  async handle(req: Request, res: Response) {
    const { password } = req.body;

    if (!req.currentUser?.id) {
      return res.status(401).json({ errorMessage: 'Unauthorized access' });
    }

    const editProfile = new ChangePassword();

    try {
      const result = await editProfile.execute({
        id: req.currentUser.id,
        password
      });

      switch (result.message) {
        case 'CHANGE_PASSWORD_SUCCESS':
          return res.status(200).json(result);
        case 'CHANGE_PASSWORD_FAILURE':
        case 'SAME_PASSWORD_FAILURE':
          return res.status(400).json(result);
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json();
    }
  }
}
