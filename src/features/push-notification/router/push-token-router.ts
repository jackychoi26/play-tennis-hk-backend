import express, { NextFunction, Router } from 'express';

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

import { body } from 'express-validator';
import RegisterPushTokenController from './controllers/register-push-token-controller';

export default class ProfileRouter {
  private router: Router = express.Router();

  private registerPushTokenController = new RegisterPushTokenController();

  constructor() {}

  setup(): Router {
    this.router.post(
      '/register',
      [body('pushToken').exists().isString().withMessage('MISSING_PUSH_TOKEN')],
      validateRequest,
      this.registerPushTokenController.handle,
      errorHandler
    );

    // this.router.post(
    //   '/update-push-notification-settings',
    //   [
    //     body('notifyDadWeather')
    //       .exists()
    //       .isBoolean()
    //       .withMessage('MISSING_NOTIFY_BAD_WEATHER'),
    //     body('notifyNewQualifyingTennisMatch')
    //       .exists()
    //       .isBoolean()
    //       .withMessage('MISSING_NOTIFY_NEW_QUALIFYING_TENNIS_MATCH'),
    //     body('notifyNewQualifyingPlayer')
    //       .exists()
    //       .isBoolean()
    //       .withMessage('MISSING_NEW_NOTIFY_QUALIFYING_PLAYER')
    //   ],
    //   validateRequest,
    //   this.registerPushTokenController.handle,
    //   errorHandler
    // );

    return this.router;
  }
}
