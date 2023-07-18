import UseCase from '../../../../core/usecase';
import ITennisMatchRepository from '../repositories/i-tennis-match-repository';
import TennisMatch from '../entities/tennis-match';
import TennisMatchRepository from '../../data/repositories/tennis-match-repository';

interface GetTennisMatchesByUserIdParam {
  userId: number;
}

type GetTennisMatchesByUserIdSuccess = {
  message: 'GET_TENNIS_MATCHES_BY_USER_ID_SUCCESS';
  tennisMatches: TennisMatch[];
};

type GetTennisMatchesByUserIdFaillure = {
  message: 'GET_TENNIS_MATCHES_BY_USER_ID_FAILURE';
};

export type GetTennisMatchesByUserIdResult =
  | GetTennisMatchesByUserIdSuccess
  | GetTennisMatchesByUserIdFaillure;

export default class GetTennisMatchByUserId
  implements
    UseCase<GetTennisMatchesByUserIdParam, GetTennisMatchesByUserIdResult>
{
  constructor(
    private repository: ITennisMatchRepository = new TennisMatchRepository()
  ) {}

  async execute(
    input: GetTennisMatchesByUserIdParam
  ): Promise<GetTennisMatchesByUserIdResult> {
    const { userId } = input;

    const tennisMatchesResult = await this.repository.getTennisMatchesByUserId({
      userId
    });

    if (tennisMatchesResult.isSuccess) {
      const tennisMatches = tennisMatchesResult.getValue();

      if (tennisMatches) {
        return {
          message: 'GET_TENNIS_MATCHES_BY_USER_ID_SUCCESS',
          tennisMatches: tennisMatches
        };
      }
    }

    return {
      message: 'GET_TENNIS_MATCHES_BY_USER_ID_FAILURE'
    };
  }
}
