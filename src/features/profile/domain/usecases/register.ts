import UserRepository from '../../data/repositories/user-repository';
import InternalError from '../../../../core/errors/internal-error';
import JwtHelper from '../../../../core/jwt-helper';
import UseCase from '../../../../core/usecase';
import IUserRepository from '../repositories/i-user-repository';
import { District } from '../../../../domain/district';
import UserProfile from '../entities/user-profile';
import User from '../entities/user';

interface RegisterParam {
  username: string;
  email: string;
  password: string;
  ntrpLevel: number;
  districts: District[];
  isProfilePublic: boolean;
  age?: number;
  imageUrl?: string;
  description?: string;
  telegram?: string;
  whatsapp?: string;
  signal?: string;
}

type RegisterSuccess = {
  message: 'REGISTER_SUCCESS';
  accessToken: string;
  userProfile: UserProfile;
};

type UsernameAlreadyExsitedFailure = {
  message: 'USERNAME_ALREADY_EXISTED_FAILURE';
};

type EmailAlreadyExistedFailure = {
  message: 'EMAIL_ALREADY_EXISTED_FAILURE';
};

type RegisterResult =
  | RegisterSuccess
  | UsernameAlreadyExsitedFailure
  | EmailAlreadyExistedFailure;

export default class Register
  implements UseCase<RegisterParam, RegisterResult>
{
  constructor(private repository: IUserRepository = new UserRepository()) {}

  async execute(input: RegisterParam): Promise<RegisterResult> {
    const { username, email } = input;

    input.password = User.hashPassword(input.password);

    const usernameSearchResult = await this.repository.getFirstUserByUsername({
      username
    });

    if (usernameSearchResult.isSuccess) {
      return {
        message: 'USERNAME_ALREADY_EXISTED_FAILURE'
      };
    }

    const emailSearchResult = await this.repository.getFirstUserByEmail({
      email
    });

    if (emailSearchResult.isSuccess) {
      return {
        message: 'EMAIL_ALREADY_EXISTED_FAILURE'
      };
    }

    const createUserResult = await this.repository.createUser(input);

    if (createUserResult?.isSuccess) {
      const user = createUserResult?.getValue();

      if (user && user.email) {
        return {
          message: 'REGISTER_SUCCESS',
          accessToken: JwtHelper.sign({
            id: user.id,
            username: user.username,
            email: user.email
          }),
          userProfile: user.toUserProfile({ withEmail: true })
        };
      }
    }

    throw new InternalError('Something went wrong');
  }
}
