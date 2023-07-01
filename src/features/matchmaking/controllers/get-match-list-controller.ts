import express, { Request, Response } from 'express';
import GetMatchList from '../usecases/get-match-list';

export class GetMatchListController {
  constructor() {}

  async handle(req: Request, res: Response) {
    try {
      const result = await new GetMatchList().execute();

      switch (result.type) {
        case 'GetMatchListSuccess':
          return res.status(200).json(result);
        case 'MatchListEmpty':
          return res.status(404).json(result);
      }
    } catch (err) {}
  }
}
