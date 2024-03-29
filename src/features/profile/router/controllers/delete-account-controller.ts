import { Request, Response } from 'express';
import UnauthorizedError from '../../../../core/errors/unauthorized-error';
import logger from '../../../../core/logger';
import DeleteAccount from '../../domain/usecases/delete-account';
import { TokenData } from '../../../../core/jwt-helper';

export default class DeleteAccountController {
  constructor() {}

  async handle(req: Request, res: Response) {
    if (!req.currentUser?.id) {
      throw new UnauthorizedError();
    }

    const deleteAccount = new DeleteAccount();

    try {
      const result = await deleteAccount.execute({
        id: req.currentUser.id
      });

      switch (result.message) {
        case 'DELETE_ACCOUNT_SUCCESS':
          return res.status(200).json(result);
        case 'DELETE_ACCOUNT_FAILURE':
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
