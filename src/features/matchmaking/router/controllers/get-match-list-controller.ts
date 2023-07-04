import express, { Request, Response } from 'express';
import GetMatchList from '../../domain/usecases/get-match-list';

export class GetMatchListController {
  constructor() {}

  async handle(req: Request, res: Response) {
    try {
      const result = await new GetMatchList().execute();

      console.log(req.headers['user-agent']);

      switch (result.message) {
        case 'GET_MATCH_LIST_SUCCESS':
          return res.status(200).json(result);
        case 'MATCH_LIST_EMPTY':
          return res.status(404).json(result);
      }
    } catch (err) {}
  }
}
