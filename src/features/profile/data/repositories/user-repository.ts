import UserProfile from 'features/profile/domain/entities/user-profile';
import Result from '../../../../core/result';
import User from '../../domain/entities/user';
import IUserRepository, {
  CreateUserParam,
  UpdateUserParam
} from '../../domain/repositories/i-user-repository';

export default class UserRepository implements IUserRepository {
  createUser({
    username,
    email,
    password,
    imageUrl,
    ntrpLevel,
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
            ntrpLevel: 3.5
          })
        );
      }, 1000);
    });
  }

  getFirstUserById({ id }: { id: string }): Promise<Result<User>> {
    return new Promise((res, rej) => {
      setTimeout(() => {
        rej(Result.fail<User>('Cannot find user'));
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

  updateUser({
    id,
    password,
    imageUrl,
    ntrpLevel,
    description,
    telegram,
    whatsapp,
    signal
  }: UpdateUserParam): Promise<Result<User>> {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(Result.fail<User>('Cannot find user'));
      });
    });
  }

  getPublicUsers(): Promise<Result<User[]>> {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(
          Result.ok<User[]>([
            User.stub({ username: 'David', ntrpLevel: 5 }).getValue()!,
            User.stub({ username: 'Bonds', ntrpLevel: 3.5 }).getValue()!,
            User.stub({ username: 'Chan', ntrpLevel: 2.5 }).getValue()!,
            User.stub({ username: 'Lee', ntrpLevel: 6.5 }).getValue()!
          ])
        );
      }, 1000);
    });
  }
}
