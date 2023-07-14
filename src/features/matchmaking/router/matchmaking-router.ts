import express, { Router } from 'express';
import { GetTennisMatchesController } from './controllers/get-tennis-matches-controller';
import emailValidator from 'validatons/email-validator';

export class MatchDetailRouter {
  private basePath = '/';
  private router: Router = express.Router();

  private getTennisMatchesController = new GetTennisMatchesController();
  constructor() {}

  setup(): Router {
    this.router.get(
      this.basePath,
      [emailValidator],
      this.getTennisMatchesController.handle
    );
    return this.router;
  }
}
