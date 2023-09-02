import express, { Router } from 'express';

import {
  validateRequest,
  errorHandler,
  requireAuth
} from '../../../middlewares';

import { body } from 'express-validator';
import RegisterPushTokenController from './controllers/register-push-token-controller';

export default class SettingsRouter {
  private router: Router = express.Router();

  private registerPushTokenController = new RegisterPushTokenController();

  constructor() {}

  setup(): Router {
    this.router.post(
      '/register-push-token',
      requireAuth,
      [body('pushToken').exists().isString().withMessage('MISSING_PUSH_TOKEN')],
      validateRequest,
      this.registerPushTokenController.handle,
      errorHandler
    );

    return this.router;
  }
}
