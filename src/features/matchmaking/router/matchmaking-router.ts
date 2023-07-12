import express, { Router } from 'express';
import { GetTennisMatchesController } from './controllers/get-tennis-matches-controller';

export class MatchDetailRouter {
  private basePath = '/';
  private router: Router = express.Router();

  private getTennisMatchesController = new GetTennisMatchesController();
  constructor() {}

  setup(): Router {
    this.router.get(this.basePath, this.getTennisMatchesController.handle);
    return this.router;
  }
}
