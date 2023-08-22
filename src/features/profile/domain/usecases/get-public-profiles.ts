import UserProfile from 'features/profile/domain/entities/user-profile';
import UseCase from '../../../../core/usecase';
import IUserRepository from 'features/profile/domain/repositories/i-user-repository';
import UserRepository from '../../data/repositories/user-repository';

interface GetPublicProfilesParam {
  offset: number;
}

type GetPublicProfilesSuccess = {
  message: 'GET_PUBLIC_PROFILES_SUCCESS';
  userProfiles: UserProfile[];
};

type GetPublicProfilesFailure = {
  message: 'GET_PUBLIC_PROFILES_FAILURE';
};

type GetPublicProfilesResult =
  | GetPublicProfilesSuccess
  | GetPublicProfilesFailure;

export default class GetPublicProfiles
  implements UseCase<GetPublicProfilesParam, GetPublicProfilesResult>
{
  constructor(private repository: IUserRepository = new UserRepository()) {}

  async execute(
    input: GetPublicProfilesParam
  ): Promise<GetPublicProfilesResult> {
    const publicUserResult = await this.repository.getPublicUsers(input.offset);

    if (publicUserResult.isFailure) {
      return {
        message: 'GET_PUBLIC_PROFILES_FAILURE'
      };
    }

    if (publicUserResult.isSuccess) {
      const publicUsers = publicUserResult.getValue();
      if (publicUsers) {
        const publicUserProfiles = publicUsers.map((user) =>
          user.toUserProfile({ withEmail: false })
        );

        return {
          message: 'GET_PUBLIC_PROFILES_SUCCESS',
          userProfiles: publicUserProfiles
        };
      }
    }

    return {
      message: 'GET_PUBLIC_PROFILES_FAILURE'
    };
  }
}
