import express, { Router } from 'express';
import { GetMatchListController } from './controllers/get-matches-controller';

export class MatchDetailRouter {
  private basePath = '/';
  private router: Router = express.Router();

  private getMatchListController = new GetMatchListController();

  constructor() {}

  setup(): Router {
    this.router.get(this.basePath, this.getMatchListController.handle);
    return this.router;
  }
}
