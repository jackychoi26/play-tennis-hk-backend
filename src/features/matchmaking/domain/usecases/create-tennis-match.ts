import TennisMatch from '../entities/tennis-match';
import { District } from '../../../../domain/district';
import { MatchType } from '../../../../domain/match-type';
import UseCase from '../../../../core/usecase';
import ITennisMatchesRepository from '../repositories/i-tennis-matches-repository';
import IUserRepository from '../../../../features/profile/domain/repositories/i-user-repository';
import User from '../../../../features/profile/domain/entities/user';

interface CreateTennisMatchParam {
  userId: string;
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
    private tennisMatchesRepository: ITennisMatchesRepository,
    private userRepository: IUserRepository
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

    User.create({ telegram: 'sjaiodsj' });
    if (userResult.isSuccess) {
      const user = userResult.getValue();

      if (user) {
        if (this.hasAtLeastOneContactInfo(user)) {
          const tennisMatchesResult =
            await this.tennisMatchesRepository.getMatches();

          if (tennisMatchesResult.isSuccess) {
            const tennisMatches = tennisMatchesResult.getValue() ?? [];

            const tennisMatchesCreatedByCurrentUser = tennisMatches.filter(
              (tennisMatch) => tennisMatch.poster.id === user.id
            );

            if (tennisMatchesCreatedByCurrentUser.length > 3) {
              return {
                message: 'TOO_MANY_MATCHES_CREATED_FAILURE'
              };
            } else {
              const tennisMatchResult =
                await this.tennisMatchesRepository.saveMatch({
                  user,
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
