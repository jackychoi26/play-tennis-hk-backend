import UseCase from '../../../../core/usecase';
import User from '../entities/user';
import IUserRepository from '../repositories/i-user-repository';

interface EditProfileParam {
  id: string;
  imageUrl?: string;
  ustaLevel: number;
  description?: string;
  telegram?: string;
  whatsapp?: string;
  signal?: string;
}

type EditProfileSuccess = {
  message: 'EDIT_PROFILE_SUCCESS';
  user: User;
};

type EditProfileFailure = {
  message: 'EDIT_PROFILE_FAILURE';
};

type EditProfileResult = EditProfileSuccess | EditProfileFailure;

export default class EditProfile
  implements UseCase<EditProfileParam, EditProfileResult>
{
  constructor(private repository: IUserRepository) {}

  async execute(input: EditProfileParam): Promise<EditProfileResult> {
    const { id, imageUrl, ustaLevel, description, telegram, whatsapp, signal } =
      input;

    const userResult = await this.repository.getFirstUserById({ id });

    if (userResult.isFailure) {
      return {
        message: 'EDIT_PROFILE_FAILURE'
      };
    }

    let newUserProfileObject = Object.assign(
      { id },
      imageUrl === undefined ? null : { imageUrl },
      ustaLevel === undefined ? null : { ustaLevel },
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
          user: updatedUser
        };
      }
    }

    return {
      message: 'EDIT_PROFILE_FAILURE'
    };
  }
}
