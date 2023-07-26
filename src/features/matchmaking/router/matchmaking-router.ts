import express, { Router } from 'express';
import { GetTennisMatchesController } from './controllers/get-tennis-matches-controller';
import { body } from 'express-validator';
import DeleteTennisMatchesController from './controllers/delete-tennis-match-controller';
import CreateTennisMatchesController from './controllers/create-tennis-match-controller';
import GetTennisMatchesByUserIdController from './controllers/get-tennis-matches-by-user-id-controller';
import {
  districtValidator,
  endDateTimeValidator,
  matchTypeValidator,
  ntrpLevelValidator,
  startDateTimeValidator
} from '../../../validatons';
import {
  requireAuth,
  validateRequest,
  errorHandler
} from '../../../middlewares';

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
      [
        body('ntrpLevel').exists().withMessage('MISSING_NTRP_LEVEL'),
        body('startDateTime').exists().withMessage('MISSING_START_DATE_TIME'),
        body('endDateTime').exists().withMessage('MISSING_END_DATE_TIME'),
        body('district').exists().withMessage('MISSING_DISTRICT'),
        body('matchType').exists().withMessage('MISSING_MATCH_TYPE')
      ],
      [
        ntrpLevelValidator,
        startDateTimeValidator,
        endDateTimeValidator,
        districtValidator,
        matchTypeValidator
      ],
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
