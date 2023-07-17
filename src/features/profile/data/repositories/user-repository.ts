import UserProfile from 'features/profile/domain/entities/user-profile';
import Result from '../../../../core/result';
import User from '../../domain/entities/user';
import IUserRepository, {
  CreateUserParam,
  UpdateUserParam
} from '../../domain/repositories/i-user-repository';
const knex = require('../../../../../database/config').knex;

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
            id: 1,
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

  getFirstUserById({ id }: { id: number }): Promise<Result<User>> {
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

  async getFirstUserByUsername({
    username
  }: {
    username: string;
  }): Promise<Result<User>> {
    const userQuery = await knex('player')
      .select('*')
      .whereRaw('LOWER(username) = LOWER(?)', username)
      .first();

    if (userQuery) {
      const data = userQuery;
      return User.create({
        id: data.id,
        username: data.username,
        email: data.email,
        password: data.password,
        isProfilePublic: data.is_profile_public,
        createdAt: data.created_at,
        imageUrl: data.image_url,
        ntrpLevel: data.ntrp_level,
        districts: data.districts,
        age: data.age,
        description: data.description,
        telegram: data.telegram,
        whatsapp: data.whatsapp,
        signal: data.signal
      });
    } else {
      return Result.fail('Cannot find user');
    }
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
