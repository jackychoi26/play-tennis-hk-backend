import { UserNotExistedError } from '../../../../domain/errors/user-not-existed-error';
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
  }: CreateUserParam): Promise<User> {
    return new Promise((res, rej) => {
      console.log('ROMAROMAEI');
      setTimeout(() => {
        res(
          User.create({
            id: 'abcd-1234',
            username: 'jackychoi',
            email: 'jackychoikinlung@gmail.com',
            password: 'saw32ioj32t49s)J@!f2f',
            createdAt: 'afdwef',
            imageUrl: 'asdjiasosdjsa',
            ustaLevel: 'sajiojewiofw'
          })
        );
      }, 1000);
    });
  }
  getFirstUserByEmail({ email }: { email: string }): Promise<User> {
    return new Promise((res, rej) => {
      setTimeout(() => {
        rej(new UserNotExistedError());
      }, 1000);
    });
  }
  getFirstUserByUsername({ username }: { username: string }): Promise<User> {
    return new Promise((res, rej) => {
      setTimeout(() => {
        rej(new Error('User not existed'));
      }, 1000);
    });
  }
}
