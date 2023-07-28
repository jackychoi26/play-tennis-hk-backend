import JwtHelper from '../../../../core/jwt-helper';
import IUserRepository from '../repositories/i-user-repository';
import Usecase from '../../../../core/usecase';
import UserRepository from '../../data/repositories/user-repository';
import UserProfile from '../entities/user-profile';

interface DeleteAccountParam {
  id: number;
}

type DeleteAccountSuccess = {
  message: 'DELETE_ACCOUNT_SUCCESS';
};

type DeleteAccountFailure = {
  message: 'DELETE_ACCOUNT_FAILURE';
};

export type DeleteAccountResult = DeleteAccountSuccess | DeleteAccountFailure;

export default class DeleteAccount
  implements Usecase<DeleteAccountParam, DeleteAccountResult>
{
  constructor(private repository: IUserRepository = new UserRepository()) {}

  async execute(input: DeleteAccountParam): Promise<DeleteAccountResult> {
    const { id } = input;

    try {
      await this.repository.deleteAccount(id);

      return {
        message: 'DELETE_ACCOUNT_SUCCESS'
      };
    } catch (err) {
      return {
        message: 'DELETE_ACCOUNT_FAILURE'
      };
    }
  }
}
