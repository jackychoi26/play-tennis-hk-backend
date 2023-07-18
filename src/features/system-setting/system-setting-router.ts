import express, { Request, Response, Router } from 'express';

export default class SystemSettingRouter {
  private router: Router = express.Router();

  constructor() {}

  setup(): Router {
    this.router.get('/', async (_: Request, res: Response) => {
      res.status(200).send({
        message: 'GET_SYSTEM_SETTING_SUCCESS',
        softUpdate: false,
        forcedUpdate: false,
        shouldClearAllData: false
      });
    });

    return this.router;
  }
}
