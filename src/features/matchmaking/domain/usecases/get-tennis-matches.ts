import TennisMatch from '../entities/tennis-match';
import TennisMatchRepository from '../../data/repositories/tennis-match-repository';
import ITennisMatchRepository from '../repositories/i-tennis-match-repository';

type GetTennisMatchesSuccess = {
  message: 'GET_TENNIS_MATCHES_SUCCESS';
  tennisMatches: TennisMatch[];
};

type GetTennisMatchesFailure = {
  message: 'GET_TENNIS_MATCHES_FAILURE';
};

export type GetTennisMatchesResult =
  | GetTennisMatchesSuccess
  | GetTennisMatchesFailure;

export default class GetTennisMatches {
  constructor(
    private repository: ITennisMatchRepository = new TennisMatchRepository()
  ) {}

  async execute(): Promise<GetTennisMatchesResult> {
    const tennisMatchesResult = await this.repository.getTennisMatches();

    if (tennisMatchesResult.isSuccess) {
      const tennisMatches = tennisMatchesResult.getValue();

      if (tennisMatches) {
        return {
          message: 'GET_TENNIS_MATCHES_SUCCESS',
          tennisMatches: tennisMatches
        };
      }
    }

    return {
      message: 'GET_TENNIS_MATCHES_FAILURE'
    };
  }
}
