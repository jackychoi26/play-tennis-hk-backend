import UserProfile from 'features/profile/domain/entities/user-profile';
import UseCase from '../../../../core/usecase';
import IUserRepository from 'features/profile/domain/repositories/i-user-repository';

type GetPublicProfilesSuccess = {
  message: 'GET_PUBLIC_PROFILE_SUCCESS';
  userProfiles: UserProfile[];
};

type GetPublicProfilesFailure = {
  message: 'GET_PUBLIC_PROFILE_FAILURE';
};

type GetPublicProfilesResult =
  | GetPublicProfilesSuccess
  | GetPublicProfilesFailure;

export default class EditProfile
  implements UseCase<null, GetPublicProfilesResult>
{
  constructor(private repository: IUserRepository) {}

  async execute(): Promise<GetPublicProfilesResult> {
    const publicUserResult = await this.repository.getPublicUsers();

    if (publicUserResult.isFailure) {
      return {
        message: 'GET_PUBLIC_PROFILE_FAILURE'
      };
    }

    if (publicUserResult.isSuccess) {
      const publicUsers = publicUserResult.getValue();
      if (publicUsers) {
        const publicUserProfiles = publicUsers.map((user) =>
          user.toUserProfile()
        );

        return {
          message: 'GET_PUBLIC_PROFILE_SUCCESS',
          userProfiles: publicUserProfiles
        };
      }
    }

    return {
      message: 'GET_PUBLIC_PROFILE_FAILURE'
    };
  }
}
