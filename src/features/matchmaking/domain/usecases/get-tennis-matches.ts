import TennisMatch from '../entities/tennis-match';
import { District } from '../../../../domain/district';
import { MatchType } from '../../../../domain/match-type';

const tennisMatches = [
  TennisMatch.stub({
    remarks:
      'Bye bye miss american pie, drove my chevy to the levee but the levee was dry'
  }),
  TennisMatch.stub({
    district: District.islands,
    matchType: MatchType.womensDoubles
  }),
  TennisMatch.stub({ district: District.wanChai }),
  TennisMatch.stub({
    district: District.kwunTong,
    matchType: MatchType.womensSingles
  }),
  TennisMatch.stub({})
];

type GetTennisMatchesSuccess = {
  message: 'GET_TENNIS_MATCHES_SUCCESS';
  tennisMatches: TennisMatch[];
};

type TennisMatchesEmpty = {
  message: 'TENNIS_MATCHES_EMPTY';
};

export type GetTennisMatchesResult =
  | GetTennisMatchesSuccess
  | TennisMatchesEmpty;

export default class GetTennisMatches {
  execute(): Promise<GetTennisMatchesResult> {
    console.log(tennisMatches);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          message: 'GET_TENNIS_MATCHES_SUCCESS',
          tennisMatches: tennisMatches
        });
      }, 1000);
    });
  }
}
