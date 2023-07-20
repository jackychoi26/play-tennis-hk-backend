import UserProfile from 'features/profile/domain/entities/user-profile';
import UseCase from '../../../../core/usecase';
import IUserRepository from 'features/profile/domain/repositories/i-user-repository';
import UserRepository from '../../data/repositories/user-repository';

interface GetProfileParam {
  id: number;
}

type GetProfileSuccess = {
  message: 'GET_PROFILE_SUCCESS';
  userProfile: UserProfile;
};

type GetProfileFailure = {
  message: 'GET_PROFILE_FAILURE';
};

type GetProfileResult = GetProfileSuccess | GetProfileFailure;

export default class GetProfile
  implements UseCase<GetProfileParam, GetProfileResult>
{
  constructor(private repository: IUserRepository = new UserRepository()) {}

  async execute({ id }: GetProfileParam): Promise<GetProfileResult> {
    const userResult = await this.repository.getFirstUserById({ id });

    if (userResult.isFailure) {
      return {
        message: 'GET_PROFILE_FAILURE'
      };
    }

    if (userResult.isSuccess) {
      const user = userResult.getValue();
      if (user) {
        const userProfile = user.toUserProfile({ withEmail: true });

        return {
          message: 'GET_PROFILE_SUCCESS',
          userProfile: userProfile
        };
      }
    }

    return {
      message: 'GET_PROFILE_FAILURE'
    };
  }
}
