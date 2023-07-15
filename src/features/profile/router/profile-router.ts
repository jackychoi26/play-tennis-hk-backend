import express, { Router } from 'express';
import { LoginController } from './controllers/login-controller';

export class ProfileRouter {
  private basePath = '/';
  private router: Router = express.Router();

  private loginController = new LoginController();
  constructor() {}

  setup(): Router {
    this.router.post(this.basePath, this.loginController.handle);
    return this.router;
  }
}
