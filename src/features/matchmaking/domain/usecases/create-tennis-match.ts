import TennisMatch from '../entities/tennis-match';
import { District } from '../../../../domain/district';
import { MatchType } from '../../../../domain/match-type';
import UseCase from '../../../../core/usecase';
import ITennisMatchRepository from '../repositories/i-tennis-match-repository';
import IUserRepository from '../../../../features/profile/domain/repositories/i-user-repository';
import User from '../../../../features/profile/domain/entities/user';
import TennisMatchRepository from '../../data/repositories/tennis-match-repository';
import UserRepository from '../../../profile/data/repositories/user-repository';

interface CreateTennisMatchParam {
  userId: number;
  ntrpLevel: number;
  startDateTime: Date;
  endDateTime: Date;
  district: District;
  matchType: MatchType;
  court: string;
  remarks?: string;
}

type CreateTennisMatchSuccess = {
  message: 'CREATE_TENNIS_MATCH_SUCCESS';
  tennisMatch: TennisMatch;
};

type TooManyMatchesCreatedFailure = {
  message: 'TOO_MANY_MATCHES_CREATED_FAILURE';
};

type MissingContactInfoFailure = {
  message: 'MISSING_CONTACT_INFO_FAILURE';
};

type CreateTennisMatchFailure = {
  message: 'CREATE_TENNIS_MATCH_FAILURE';
};

export type CreateTennisMatchResult =
  | CreateTennisMatchSuccess
  | TooManyMatchesCreatedFailure
  | MissingContactInfoFailure
  | CreateTennisMatchFailure;

export default class CreateTennisMatch
  implements UseCase<CreateTennisMatchParam, CreateTennisMatchResult>
{
  constructor(
    private tennisMatchRepository: ITennisMatchRepository = new TennisMatchRepository(),
    private userRepository: IUserRepository = new UserRepository()
  ) {}

  async execute(
    input: CreateTennisMatchParam
  ): Promise<CreateTennisMatchResult> {
    const {
      userId,
      ntrpLevel,
      startDateTime,
      endDateTime,
      district,
      matchType,
      court,
      remarks
    } = input;

    const userResult = await this.userRepository.getFirstUserById({
      id: userId
    });

    if (userResult.isFailure) {
      return {
        message: 'CREATE_TENNIS_MATCH_FAILURE'
      };
    }

    if (userResult.isSuccess) {
      const user = userResult.getValue();

      if (user) {
        if (this.hasAtLeastOneContactInfo(user)) {
          const tennisMatchesResult =
            await this.tennisMatchRepository.getTennisMatches();

          if (tennisMatchesResult.isSuccess) {
            const tennisMatches = tennisMatchesResult.getValue() ?? [];

            // Optimize this part
            const tennisMatchesCreatedByCurrentUser = tennisMatches.filter(
              (tennisMatch) => tennisMatch.poster.id === user.id
            );

            // TODO: move to system param
            if (tennisMatchesCreatedByCurrentUser.length > 2) {
              return {
                message: 'TOO_MANY_MATCHES_CREATED_FAILURE'
              };
            } else {
              const tennisMatchResult =
                await this.tennisMatchRepository.saveTennisMatch({
                  userId: user.id,
                  ntrpLevel,
                  startDateTime,
                  endDateTime,
                  district,
                  matchType,
                  court,
                  remarks
                });

              if (tennisMatchResult.isSuccess) {
                const tennisMatch = tennisMatchResult.getValue();

                if (tennisMatch) {
                  return {
                    message: 'CREATE_TENNIS_MATCH_SUCCESS',
                    tennisMatch: tennisMatch
                  };
                }
              }
            }
          }
        } else {
          return {
            message: 'MISSING_CONTACT_INFO_FAILURE'
          };
        }
      }
    }

    return {
      message: 'CREATE_TENNIS_MATCH_FAILURE'
    };
  }

  private hasAtLeastOneContactInfo(user: User): boolean {
    const telegram = user.telegram;
    const signal = user.signal;
    const whatsapp = user.signal;

    return (
      telegram != undefined || signal != undefined || whatsapp != undefined
    );
  }
}
