import UseCase from '../../../../core/usecase';
import IUserRepository from 'features/profile/domain/repositories/i-user-repository';
import ITennisMatchRepository from '../repositories/i-tennis-match-repository';
import TennisMatch from '../entities/tennis-match';

interface DeleteTennisMatchParam {
  tennisMatchId: number;
  userId: number;
}

type DeleteTennisMatchSuccess = {
  message: 'DELETE_TENNIS_MATCH_SUCCESS';
};

type DeleteTennisMatchFailure = {
  message: 'DELETE_TENNIS_MATCH_FAILURE';
};

export type DeleteTennisMatchResult =
  | DeleteTennisMatchSuccess
  | DeleteTennisMatchFailure;

export default class DeleteTennisMatch
  implements UseCase<DeleteTennisMatchParam, DeleteTennisMatchResult>
{
  constructor(private tennisMatchRepository: ITennisMatchRepository) {}

  async execute(
    input: DeleteTennisMatchParam
  ): Promise<DeleteTennisMatchResult> {
    const { tennisMatchId, userId } = input;

    const tennisMatchResult =
      await this.tennisMatchRepository.getTennisMatchById({
        tennisMatchId
      });

    if (tennisMatchResult.isSuccess) {
      const tennisMatch: TennisMatch | undefined = tennisMatchResult.getValue();

      if (tennisMatch) {
        if (tennisMatch.poster.id == userId) {
          this.tennisMatchRepository.deleteTennisMatch({ tennisMatchId });
        }
      }
    }

    return {
      message: 'DELETE_TENNIS_MATCH_FAILURE'
    };
  }
}
