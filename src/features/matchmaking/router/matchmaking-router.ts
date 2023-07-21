import express, { Router } from 'express';
import { GetTennisMatchesController } from './controllers/get-tennis-matches-controller';
import { body } from 'express-validator';
import DeleteTennisMatchesController from './controllers/delete-tennis-match-controller';
import CreateTennisMatchesController from './controllers/create-tennis-match-controller';
import GetTennisMatchesByUserIdController from './controllers/get-tennis-matches-by-user-id-controller';
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
import requireAuth from '../../../middlewares/require-auth';
import validateRequest from '../../../middlewares/validate-request';
import errorHandler from '../../../middlewares/error-handler';

export default class MatchmakingRouter {
  private router: Router = express.Router();
  private getTennisMatchesController = new GetTennisMatchesController();
  private deleteTennisMatchController = new DeleteTennisMatchesController();
  private createTennisMatchController = new CreateTennisMatchesController();
  private getTennisMatchesByUserIdController =
    new GetTennisMatchesByUserIdController();

  constructor() {}

  setup(): Router {
    this.router.get('/all', this.getTennisMatchesController.handle);

    this.router.get(
      '/',
      requireAuth,
      this.getTennisMatchesByUserIdController.handle,
      errorHandler
    );

    // TODO: validate startDateTime endDateTime district matchType court remarks
    //  ntrpLevel, startDateTime, endDateTime, district, matchType, court, remarks;
    this.router.post(
      '/',
      requireAuth,
      [body('ntrpLevel').exists().withMessage('MISSING_NTRP_LEVEL')],
      [ntrpLevelValidator],
      validateRequest,
      this.createTennisMatchController.handle,
      errorHandler
    );

    this.router.delete(
      '/',
      requireAuth,
      body('tennisMatchId')
        .isNumeric()
        .notEmpty()
        .withMessage('MISSING_TENNIS_MATCH_ID'),
      validateRequest,
      this.deleteTennisMatchController.handle,
      errorHandler
    );
    return this.router;
  }
}
