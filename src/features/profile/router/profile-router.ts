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
  districtsValidator,
  signalValidator,
  telegramValidator,
  usernameValidator,
  whatsappValidator,
  districtValidator,
  matchTypeValidator
} from '../../../validatons';
import GetPublicProfilesController from './controllers/get-public-profiles-controller';
import ChangePasswordController from './controllers/change-password-controller';
import RegisterController from './controllers/register-controller';
import GetProfileController from './controllers/get-profile-controller';

export default class ProfileRouter {
  private router: Router = express.Router();

  private loginController = new LoginController();
  private editProfileController = new EditProfileController();
  private getPublicProfilesController = new GetPublicProfilesController();
  private changePasswordController = new ChangePasswordController();
  private registerController = new RegisterController();
  private getProfileController = new GetProfileController();

  constructor() {}

  setup(): Router {
    this.router.get('/all', this.getPublicProfilesController.handle);

    this.router.get(
      '/',
      requireAuth,
      this.getProfileController.handle,
      errorHandler
    );

    this.router.post(
      '/login',
      [usernameValidator, passwordValidator],
      validateRequest,
      this.loginController.handle,
      errorHandler
    );

    this.router.post(
      '/register',
      [
        usernameValidator,
        districtsValidator,
        emailValidator,
        passwordValidator,
        ntrpLevelValidator,
        descriptionValidator.optional(),
        signalValidator.optional(),
        whatsappValidator.optional(),
        telegramValidator.optional()
      ],
      validateRequest,
      this.registerController.handle,
      errorHandler
    );

    this.router.patch(
      '/change-password',
      requireAuth,
      [passwordValidator],
      validateRequest,
      this.changePasswordController.handle,
      errorHandler
    );

    this.router.patch(
      '/',
      requireAuth,
      [
        ntrpLevelValidator.optional(),
        descriptionValidator.optional(),
        districtValidator.optional(),
        signalValidator.optional(),
        whatsappValidator.optional(),
        telegramValidator.optional()
      ],
      validateRequest,
      this.editProfileController.handle,
      errorHandler
    );

    return this.router;
  }
}
