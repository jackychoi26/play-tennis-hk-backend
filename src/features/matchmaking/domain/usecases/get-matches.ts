import { Match } from '../entities/match';
import { District } from '../../../../domain/district';
import { MatchType } from '../../../../domain/match-type';

const tennisMatches = [
  Match.stub({
    remarks:
      'Bye bye miss american pie, drove my chevy to the levee but the levee was dry'
  }),
  Match.stub({
    district: District.islands,
    matchType: MatchType.womensDoubles
  }),
  Match.stub({ district: District.wanChai }),
  Match.stub({
    district: District.kwunTong,
    matchType: MatchType.womensSingles
  }),
  Match.stub({})
];

type GetMatchesSuccess = {
  message: 'GET_MATCHES_SUCCESS';
  tennisMatches: Match[];
};

type MatchesEmpty = {
  message: 'MATCHES_EMPTY';
};

export type GetMatchesResult = GetMatchesSuccess | MatchesEmpty;

export default class GetMatches {
  execute(): Promise<GetMatchesResult> {
    console.log(tennisMatches);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          message: 'GET_MATCHES_SUCCESS',
          tennisMatches: tennisMatches
        });
      }, 1000);
    });
  }
}
