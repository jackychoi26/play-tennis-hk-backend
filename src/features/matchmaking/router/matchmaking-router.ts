import express, { Router } from 'express';
import { GetTennisMatchesController } from './controllers/get-tennis-matches-controller';
import { body } from 'express-validator';
import DeleteTennisMatchesController from './controllers/delete-tennis-match-controller';

export default class MatchmakingRouter {
  private router: Router = express.Router();
  private getTennisMatchesController = new GetTennisMatchesController();
  private deleteTennisMatchController = new DeleteTennisMatchesController();

  constructor() {}

  setup(): Router {
    this.router.get('/', this.getTennisMatchesController.handle);

    this.router.delete(
      '/',
      body('tennisMatchId')
        .isNumeric()
        .notEmpty()
        .withMessage('Missing tennis match id'),
      this.deleteTennisMatchController.handle
    );
    return this.router;
  }
}
