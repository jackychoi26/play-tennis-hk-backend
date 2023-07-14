import JwtHelper from '../../../../core/jwt-helper';
import IUserRepository from '../repositories/i-user-repository';
import Usecase from '../../../../core/usecase';

interface LoginParam {
  username: string;
  password: string;
}

type LoginSuccess = {
  message: 'LOGIN_SUCCESS';
  token: string;
};

type LoginFailure = {
  message: 'LOGIN_FAILURE';
};

export type LoginResult = LoginSuccess | LoginFailure;

export default class Login implements Usecase<LoginParam, LoginResult> {
  constructor(private repository: IUserRepository) {}

  async execute(input: LoginParam): Promise<LoginResult> {
    const { username, password } = input;
    const result = await this.repository.getFirstUserByUsername({
      username: username
    });

    if (result.isFailure) {
      return {
        message: 'LOGIN_FAILURE'
      };
    }

    const user = result.getValue();

    if (user && user.comparePassword(password)) {
      return {
        message: 'LOGIN_SUCCESS',
        token: JwtHelper.sign({
          id: user.id,
          username: user.username,
          email: user.email
        })
      };
    } else {
      return {
        message: 'LOGIN_FAILURE'
      };
    }
  }
}
