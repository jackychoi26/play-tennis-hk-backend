import { Request, Response } from 'express';
import Login from '../../../profile/domain/usecases/login';

export default class LoginController {
  constructor() {}

  async handle(req: Request, res: Response) {
    try {
      const username: string = req.body.username;
      const password: string = req.body.password;

      const result = await new Login().execute({ username, password });

      switch (result.message) {
        case 'LOGIN_SUCCESS':
          return res.status(200).json(result);
        case 'LOGIN_FAILURE':
          return res.status(400).json(result);
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json();
    }
  }
}
