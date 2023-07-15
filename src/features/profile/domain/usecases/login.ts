import JwtHelper from '../../../../core/jwt-helper';
import IUserRepository from '../repositories/i-user-repository';
import Usecase from '../../../../core/usecase';
import User from '../entities/user';
import UserRepository from '../../data/repositories/user-repository';
import UserProfile from '../entities/user-profile';

interface LoginParam {
  username: string;
  password: string;
}

type LoginSuccess = {
  message: 'LOGIN_SUCCESS';
  userProfile: UserProfile;
  accessToken: string;
};

type LoginFailure = {
  message: 'LOGIN_FAILURE';
};

export type LoginResult = LoginSuccess | LoginFailure;

export default class Login implements Usecase<LoginParam, LoginResult> {
  constructor(private repository: IUserRepository = new UserRepository()) {}

  async execute(input: LoginParam): Promise<LoginResult> {
    console.log('testing');
    // const { username, password } = input;
    // console.log(username, password);
    // console.log(username, password);

    return new Promise((res, rej) => {
      setTimeout(() => {
        res({
          message: 'LOGIN_SUCCESS',
          userProfile: User.stub({}).getValue()!.toUserProfile(),
          accessToken: 'AccessToken'
        });
      }, 1000);
    });
    // const result = await this.repository.getFirstUserByUsername({
    //   username: username
    // });

    // if (result.isFailure) {
    //   return {
    //     type: 'LOGIN_FAILURE'
    //   };
    // }

    // const user = result.getValue();

    // if (user && user.comparePassword(password)) {
    //   return {
    //     type: 'LOGIN_SUCCESS',
    //     token: JwtHelper.sign({
    //       id: user.id,
    //       username: user.username,
    //       email: user.email
    //     })
    //   };
    // } else {
    //   return {
    //     type: 'LOGIN_FAILURE'
    //   };
    // }
  }
}
