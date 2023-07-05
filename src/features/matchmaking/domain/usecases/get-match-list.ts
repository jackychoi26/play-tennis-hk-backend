import { Match } from '../entities/match';

const matchList = [
  Match.stub(),
  Match.stub(),
  Match.stub(),
  Match.stub(),
  Match.stub()
];

type GetMatchListSuccess = {
  message: 'GET_MATCH_LIST_SUCCESS';
  matchList: Match[];
};

type MatchListEmpty = {
  message: 'MATCH_LIST_EMPTY';
};

export type GetMatchListResult = GetMatchListSuccess | MatchListEmpty;

export default class GetMatchList {
  execute(): Promise<GetMatchListResult> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          message: 'GET_MATCH_LIST_SUCCESS',
          matchList: matchList
        });
      }, 1000);
    });
  }
}
