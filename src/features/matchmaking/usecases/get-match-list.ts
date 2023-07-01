import { Match } from '../entities/Match';

const matchList = [
  Match.stub(),
  Match.stub(),
  Match.stub(),
  Match.stub(),
  Match.stub(),
];

type GetMatchListSuccess = {
  type: 'GetMatchListSuccess';
  matchList: Match[];
};

type MatchListEmpty = {
  type: 'MatchListEmpty';
};

export type GetMatchListResult = GetMatchListSuccess | MatchListEmpty;

export default class GetMatchList {
  execute(): Promise<GetMatchListResult> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          type: 'GetMatchListSuccess',
          matchList: matchList,
        });
      }, 1000);
    });
  }
}
