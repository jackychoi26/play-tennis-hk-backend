import express, { NextFunction, Router } from 'express';
import LoginController from './controllers/login-controller';
import EditProfileController from './controllers/edit-profile-controller';

import {
  requireAuth,
  validateRequest,
  errorHandler
} from '../../../middlewares/';

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
  ageValidator,
  isProfilePublicValidator
} from '../../../validatons';
import GetPublicProfilesController from './controllers/get-public-profiles-controller';
import ChangePasswordController from './controllers/change-password-controller';
import RegisterController from './controllers/register-controller';
import GetProfileController from './controllers/get-profile-controller';
import { body, check } from 'express-validator';

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
      [
        body('username').exists().withMessage('MISSING_USERNAME'),
        body('password').exists().withMessage('MISSING_PASSWORD')
      ],
      [usernameValidator, passwordValidator],
      validateRequest,
      this.loginController.handle,
      errorHandler
    );

    this.router.post(
      '/register',
      [
        body('username').exists().withMessage('MISSING_USERNAME'),
        body('email').exists().withMessage('MISSING_EMAIL'),
        body('password').exists().withMessage('MISSING_PASSWORD'),
        body('ntrpLevel').exists().withMessage('MISSING_NTRP_LEVEL'),
        body('isProfilePublic')
          .exists()
          .withMessage('MISSING_IS_PROFILE_PUBLIC'),
        body('districts').exists().withMessage('MISSING_DISTRICTS')
      ],
      [
        ntrpLevelValidator,
        usernameValidator,
        districtsValidator,
        emailValidator,
        ageValidator,
        passwordValidator,
        isProfilePublicValidator,
        descriptionValidator,
        signalValidator,
        whatsappValidator,
        telegramValidator
      ],
      validateRequest,
      this.registerController.handle,
      errorHandler
    );

    this.router.patch(
      '/change-password',
      requireAuth,
      [body('password').exists().withMessage('MISSING_PASSWORD')],
      [passwordValidator],
      validateRequest,
      this.changePasswordController.handle,
      errorHandler
    );

    this.router.patch(
      '/',
      requireAuth,
      [
        ntrpLevelValidator,
        descriptionValidator,
        districtsValidator,
        signalValidator,
        whatsappValidator,
        ageValidator,
        telegramValidator
      ],
      validateRequest,
      this.editProfileController.handle,
      errorHandler
    );

    return this.router;
  }
}
