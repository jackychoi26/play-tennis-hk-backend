import JwtHelper from '../../../../core/jwt-helper';
import UseCase from '../../../../core/usecase';
import IUserRepository from '../repositories/i-user-repository';

interface RegisterParam {
  username: string;
  email: string;
  password: string;
  ustaLevel: number;
  imageUrl: string;
  description?: string;
  telegram?: string;
  whatsapp?: string;
  signal?: string;
}

type RegisterSuccess = {
  type: 'REGISTER_SUCCESS';
  token: string;
};

type UsernameAlreadyExsitedFailure = {
  type: 'USERNAME_ALREADY_EXISTED_FAILURE';
};

type EmailAlreadyExistedFailure = {
  type: 'EMAIL_ALREADY_EXISTED_FAILURE';
};

type RegisterResult =
  | RegisterSuccess
  | UsernameAlreadyExsitedFailure
  | EmailAlreadyExistedFailure;

export default class Register
  implements UseCase<RegisterParam, RegisterResult>
{
  constructor(private repository: IUserRepository) {}

  async execute(input: RegisterParam): Promise<RegisterResult> {
    const { username, email } = input;

    const usernameSearchResult = await this.repository.getFirstUserByUsername({
      username
    });

    if (usernameSearchResult.isSuccess) {
      return {
        type: 'USERNAME_ALREADY_EXISTED_FAILURE'
      };
    }

    const emailSearchResult = await this.repository.getFirstUserByEmail({
      email
    });

    if (emailSearchResult.isSuccess) {
      return {
        type: 'EMAIL_ALREADY_EXISTED_FAILURE'
      };
    }

    const createUserResult = await this.repository.createUser(input);
    const user = createUserResult?.getValue();

    if (createUserResult?.isSuccess && user) {
      return Promise.resolve({
        type: 'REGISTER_SUCCESS',
        token: JwtHelper.sign({
          id: user.id,
          username: user.username,
          email: user.email
        })
      });
    } else {
      throw new Error();
    }
  }
}
