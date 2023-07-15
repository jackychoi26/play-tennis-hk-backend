import { Request, Response } from 'express';
import Login from '../../../profile/domain/usecases/login';

export class LoginController {
  constructor() {}

  async handle(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const result = await new Login().execute({ username, password });

      switch (result.message) {
        case 'LOGIN_SUCCESS':
          console.dir(result.userProfile);
          return res.status(200).json(result);
        case 'LOGIN_FAILURE':
          return res.status(401).json(result);
      }
    } catch (err) {
      return res.status(500).json();
    }
  }
}
