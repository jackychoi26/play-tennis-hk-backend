import UserRepository from '../../../profile/data/repositories/user-repository';
import UseCase from '../../../../core/usecase';
import User from '../entities/user';
import UserProfile from '../entities/user-profile';
import IUserRepository from '../repositories/i-user-repository';

interface EditProfileParam {
  id: number;
  imageUrl?: string;
  ntrpLevel?: number;
  isProfilePublic?: boolean;
  description?: string;
  telegram?: string;
  whatsapp?: string;
  signal?: string;
}

type EditProfileSuccess = {
  message: 'EDIT_PROFILE_SUCCESS';
  userProfile: UserProfile;
};

type EditProfileFailure = {
  message: 'EDIT_PROFILE_FAILURE';
};

type EditProfileResult = EditProfileSuccess | EditProfileFailure;

export default class EditProfile
  implements UseCase<EditProfileParam, EditProfileResult>
{
  constructor(private repository: IUserRepository = new UserRepository()) {}

  async execute(input: EditProfileParam): Promise<EditProfileResult> {
    const {
      id,
      imageUrl,
      ntrpLevel,
      description,
      telegram,
      whatsapp,
      signal,
      isProfilePublic
    } = input;

    const userResult = await this.repository.getFirstUserById({ id });

    if (userResult.isFailure) {
      return {
        message: 'EDIT_PROFILE_FAILURE'
      };
    }

    let newUserProfileObject = Object.assign(
      { id },
      imageUrl === undefined ? null : { imageUrl },
      ntrpLevel === undefined ? null : { ntrpLevel },
      isProfilePublic === undefined ? null : { isProfilePublic },
      description === undefined ? null : { description },
      telegram === undefined ? null : { telegram },
      whatsapp === undefined ? null : { whatsapp },
      signal === undefined ? null : { signal }
    );

    const updatedUserResult = await this.repository.updateUser(
      newUserProfileObject
    );

    if (updatedUserResult.isSuccess) {
      const updatedUser = updatedUserResult.getValue();
      if (updatedUser) {
        return {
          message: 'EDIT_PROFILE_SUCCESS',
          userProfile: updatedUser.toUserProfile({ withEmail: true })
        };
      }
    }

    return {
      message: 'EDIT_PROFILE_FAILURE'
    };
  }
}
