import express, { Router } from 'express';
import LoginController from './controllers/login-controller';
import EditProfileController from './controllers/edit-profile-controller';
import requireAuth from '../../../middlewares/require-auth';
import errorHandler from '../../../middlewares/error-handler';
import validateRequest from '../../../middlewares/validate-request';
import {
  descriptionValidator,
  ntrpLevelValidator,
  passwordValidator,
  signalValidator,
  telegramValidator,
  usernameValidator,
  whatsappValidator
} from '../../../validatons';

export class ProfileRouter {
  private router: Router = express.Router();

  private loginController = new LoginController();
  private editProfileController = new EditProfileController();

  constructor() {}

  setup(): Router {
    this.router.post(
      '/login',
      [usernameValidator, passwordValidator],
      validateRequest,
      errorHandler,
      this.loginController.handle
    );

    this.router.patch(
      '/',
      requireAuth,
      [
        ntrpLevelValidator.optional(),
        descriptionValidator.optional(),
        signalValidator.optional(),
        whatsappValidator.optional(),
        telegramValidator.optional()
      ],
      validateRequest,
      errorHandler,
      this.editProfileController.handle
    );
    return this.router;
  }
}
