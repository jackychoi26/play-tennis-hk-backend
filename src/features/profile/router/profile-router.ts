import express, { Router } from 'express';
import LoginController from './controllers/login-controller';
import EditProfileController from './controllers/edit-profile-controller';
import requireAuth from '../../../middlewares/require-auth';
import errorHandler from '../../../middlewares/error-handler';
import validateRequest from '../../../middlewares/validate-request';
import {
  descriptionValidator,
  emailValidator,
  ntrpLevelValidator,
  passwordValidator,
  signalValidator,
  telegramValidator,
  usernameValidator,
  whatsappValidator
} from '../../../validatons';
import GetPublicProfilesController from './controllers/get-public-profiles-controller';
import ChangePasswordController from './controllers/change-password-controller';
import RegisterController from './controllers/register-controller';

export default class ProfileRouter {
  private router: Router = express.Router();

  private loginController = new LoginController();
  private editProfileController = new EditProfileController();
  private getPublicProfilesController = new GetPublicProfilesController();
  private changePasswordController = new ChangePasswordController();
  private registerController = new RegisterController();

  constructor() {}

  setup(): Router {
    this.router.get('/all', this.getPublicProfilesController.handle);

    this.router.post(
      '/login',
      [usernameValidator, passwordValidator],
      validateRequest,
      errorHandler,
      this.loginController.handle
    );

    this.router.post(
      '/register',
      [
        usernameValidator,
        emailValidator,
        passwordValidator,
        ntrpLevelValidator,
        descriptionValidator.optional(),
        signalValidator.optional(),
        whatsappValidator.optional(),
        telegramValidator.optional()
      ],
      validateRequest,
      errorHandler,
      this.registerController.handle
    );

    this.router.patch(
      '/change-password',
      requireAuth,
      [passwordValidator],
      validateRequest,
      errorHandler,
      this.changePasswordController.handle
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
