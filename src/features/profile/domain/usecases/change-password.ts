import UseCase from '../../../../core/usecase';
import IUserRepository from '../repositories/i-user-repository';
import User from '../entities/user';

interface ChangePasswordParam {
  id: string;
  password: string;
}

type ChangePasswordSuccess = {
  message: 'CHANGE_PASSWORD_SUCCESS';
};

type ChangePasswordFailure = {
  message: 'CHANGE_PASSWORD_FAILURE';
};

type SamePasswordFailure = {
  message: 'SAME_PASSWORD_FAILURE';
};

type ChangePasswordResult =
  | ChangePasswordSuccess
  | SamePasswordFailure
  | ChangePasswordFailure;

export default class ChangePassword
  implements UseCase<ChangePasswordParam, ChangePasswordResult>
{
  constructor(private repository: IUserRepository) {}

  async execute(input: ChangePasswordParam): Promise<ChangePasswordResult> {
    const { id, password } = input;

    const searchUserResult = await this.repository.getFirstUserById({ id });

    if (searchUserResult.isFailure) {
      return {
        message: 'CHANGE_PASSWORD_FAILURE'
      };
    }

    if (searchUserResult.isSuccess) {
      const user = searchUserResult.getValue();

      if (user) {
        const isSameAsOldPassword = user.comparePassword(password);

        if (isSameAsOldPassword) {
          return {
            message: 'SAME_PASSWORD_FAILURE'
          };
        } else {
          const updateUserResult = await this.repository.updateUser({
            id,
            password: User.hashPassword(password)
          });

          if (updateUserResult.isSuccess) {
            return {
              message: 'CHANGE_PASSWORD_SUCCESS'
            };
          }
        }
      }
    }

    return {
      message: 'CHANGE_PASSWORD_FAILURE'
    };
  }
}
