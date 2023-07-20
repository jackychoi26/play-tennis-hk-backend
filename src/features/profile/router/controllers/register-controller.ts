import { Request, Response } from 'express';
import Register from '../../domain/usecases/register';
import { District } from '../../../../domain/district';

export default class RegisterController {
  constructor() {}

  async handle(req: Request, res: Response) {
    try {
      const username: string = req.body.username;
      const email: string = req.body.email;
      const password: string = req.body.password;
      const ntrpLevel: number = req.body.ntrpLevel;
      const isProfilePublic: boolean = req.body.isProfilePublic;
      const districts: District[] = req.body.districts;
      const imageUrl: string | undefined = req.body.imageUrl;
      const description: string | undefined = req.body.description;
      const telegram: string | undefined = req.body.telegram;
      const whatsapp: string | undefined = req.body.whatsapp;
      const signal: string | undefined = req.body.signal;

      const register = await new Register();

      const registerInput = Object.assign(
        { username, email, password, ntrpLevel, isProfilePublic, districts },
        imageUrl === undefined ? null : { imageUrl },
        description === undefined ? null : { description },
        districts === undefined ? null : { districts },
        telegram === undefined ? null : { telegram },
        whatsapp === undefined ? null : { whatsapp },
        signal === undefined ? null : { signal }
      );

      const result = await register.execute(registerInput);

      switch (result.message) {
        case 'REGISTER_SUCCESS':
          return res.status(201).json(result);
        case 'USERNAME_ALREADY_EXISTED_FAILURE':
        case 'EMAIL_ALREADY_EXISTED_FAILURE':
          return res.status(400).json(result);
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json();
    }
  }
}
