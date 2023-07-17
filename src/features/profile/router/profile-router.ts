import express, { Router } from 'express';
import LoginController from './controllers/login-controller';
import EditProfileController from './controllers/edit-profile-controller';
import requireAuth from '../../../middlewares/require-auth';
import errorHandler from '../../../middlewares/error-handler';
import validateRequest from '../../../middlewares/validate-request';
import ntrpLevelValidator from '../../../validatons/ntrp-level-validator';
import descriptionValidator from '../../../validatons/description-validator';
import signalValidator from '../../../validatons/signal-validator';
import whatsappValidator from '../../../validatons/whatsapp-validator';
import telegramValidator from '../../../validatons/telegram-validator';
import usernameValidator from '../../../validatons/username-validator';
import passwordValidator from '../../../validatons/password-validator';

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
        telegramValidator
      ],
      validateRequest,
      errorHandler,
      this.editProfileController.handle
    );
    return this.router;
  }
}
