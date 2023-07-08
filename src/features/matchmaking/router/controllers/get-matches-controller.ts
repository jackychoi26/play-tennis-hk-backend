import express, { Request, Response } from 'express';
import GetMatchList from '../../domain/usecases/get-matches';

export class GetMatchListController {
  constructor() {}

  async handle(req: Request, res: Response) {
    try {
      const result = await new GetMatchList().execute();

      switch (result.message) {
        case 'GET_MATCHES_SUCCESS':
          return res.status(200).json(result);
        case 'MATCHES_EMPTY':
          return res.status(404).json(result);
      }
    } catch (err) {}
  }
}
