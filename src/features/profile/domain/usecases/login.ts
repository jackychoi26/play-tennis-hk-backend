import JwtHelper from '../../../../core/jwt-helper';
import User from '../entities/user';
import IUserRepository from '../repositories/i-user-repository';

type LoginSuccess = {
  type: 'LOGIN_SUCCESS';
  token: string;
};

type LoginFailure = {
  type: 'LOGIN_FAILURE';
};

export type LoginResult = LoginSuccess | LoginFailure;

export default class Login {
  constructor(private repository: IUserRepository) {}

  async execute({
    username,
    password
  }: {
    username: string;
    password: string;
  }): Promise<LoginResult> {
    const user = await this.repository.getFirstUserByUsername({
      username: username
    });

    if (user.comparePassword(password)) {
      return {
        type: 'LOGIN_SUCCESS',
        token: JwtHelper.sign({
          id: user.id,
          username: user.username,
          email: user.email
        })
      };
    } else {
      return {
        type: 'LOGIN_FAILURE'
      };
    }
  }
}
