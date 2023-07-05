import Result from '../../../../core/result';
import User from '../../domain/entities/user';
import IUserRepository, {
  CreateUserParam
} from '../../domain/repositories/i-user-repository';

export default class UserRepository implements IUserRepository {
  createUser({
    username,
    email,
    password,
    imageUrl,
    ustaLevel,
    description,
    telegram,
    whatsapp,
    signal
  }: CreateUserParam): Promise<Result<User>> {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(
          User.create({
            id: 'abcd-1234',
            username: 'jackychoi',
            email: 'jackychoikinlung@gmail.com',
            password: 'saw32ioj32t49s)J@!f2f',
            createdAt: 'afdwef',
            imageUrl: 'asdjiasosdjsa',
            ustaLevel: 3.5
          })
        );
      }, 1000);
    });
  }
  getFirstUserByEmail({ email }: { email: string }): Promise<Result<User>> {
    return new Promise((res, rej) => {
      setTimeout(() => {
        rej(Result.fail<User>('Cannot find user'));
      }, 1000);
    });
  }
  getFirstUserByUsername({
    username
  }: {
    username: string;
  }): Promise<Result<User>> {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(Result.fail<User>('Cannot find user'));
      }, 1000);
    });
  }
}
