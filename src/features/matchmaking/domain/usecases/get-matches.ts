import { Match } from '../entities/match';

const matches = [
  Match.stub({ remarks: 'ASJIDOAJSIDO' }),
  Match.stub({ district: 'ISLANDS' }),
  Match.stub({ district: 'WAN_CHAI' }),
  Match.stub({ district: 'KWUN_TONG' }),
  Match.stub({})
];

type GetMatchesSuccess = {
  message: 'GET_MATCHES_SUCCESS';
  matches: Match[];
};

type MatchesEmpty = {
  message: 'MATCHES_EMPTY';
};

export type GetMatchesResult = GetMatchesSuccess | MatchesEmpty;

export default class GetMatches {
  execute(): Promise<GetMatchesResult> {
    console.log(matches);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          message: 'GET_MATCHES_SUCCESS',
          matches: matches
        });
      }, 1000);
    });
  }
}
