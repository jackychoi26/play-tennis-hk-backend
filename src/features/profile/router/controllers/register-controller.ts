import { Request, Response } from 'express';
import Register from '../../domain/usecases/register';

export default class RegisterController {
  constructor() {}

  async handle(req: Request, res: Response) {
    try {
      const username: string = req.body.username;
      const email: string = req.body.email;
      const password: string = req.body.password;
      const ntrpLevel: number = req.body.ntrpLevel;
      const isProfilePublic: boolean = req.body.isProfilePublic;
      const imageUrl: string | undefined = req.body.imageUrl;
      const description: string | undefined = req.body.description;
      const telegram: string | undefined = req.body.telegram;
      const whatsapp: string | undefined = req.body.whatsapp;
      const signal: string | undefined = req.body.signal;

      const register = await new Register();

      const result = await register.execute({
        username,
        email,
        isProfilePublic,
        password,
        ntrpLevel,
        imageUrl,
        description,
        telegram,
        whatsapp,
        signal
      });

      switch (result.message) {
        case 'REGISTER_SUCCESS':
          return res.status(201).json(result);
        case 'USERNAME_ALREADY_EXISTED_FAILURE':
        case 'EMAIL_ALREADY_EXISTED_FAILURE':
          return res.status(401).json(result);
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json();
    }
  }
}
