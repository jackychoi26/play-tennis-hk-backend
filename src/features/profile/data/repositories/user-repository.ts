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

  async getFirstUserById({ id }: { id: number }): Promise<Result<User>> {
    const userQuery = await knex('player').select('*').where('id', id).first();

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

  async getFirstUserByEmail({
    email
  }: {
    email: string;
  }): Promise<Result<User>> {
    const userQuery = await knex('player')
      .select('*')
      .where('email', email)
      .first();

    console.log('Email', userQuery);

    if (userQuery == undefined) {
      return Result.fail('Failed to find user');
    }

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

    if (userQuery == undefined) {
      return Result.fail('Failed to find user');
    }

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
  }

  async updateUser({
    id,
    password,
    imageUrl,
    ntrpLevel,
    description,
    telegram,
    whatsapp,
    signal
  }: UpdateUserParam): Promise<Result<User>> {
    let newUserProfileObject = Object.assign(
      {},
      password === undefined ? null : { password },
      imageUrl === undefined ? null : { imageUrl },
      ntrpLevel === undefined ? null : { ntrpLevel },
      description === undefined ? null : { description },
      telegram === undefined ? null : { telegram },
      whatsapp === undefined ? null : { whatsapp },
      signal === undefined ? null : { signal }
    );

    const userUpdate = await knex('player')
      .where('id', id)
      .first()
      .update(newUserProfileObject)
      .returning('*');

    if (userUpdate == undefined || userUpdate?.length < 1) {
      return Result.fail('Failed to update user');
    }

    const data = userUpdate[0];

    const userResult = User.create({
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

    if (userResult.isSuccess) {
      return userResult;
    } else {
      return Result.fail('Something went wrong after updating user');
    }
  }

  async getPublicUsers(): Promise<Result<User[]>> {
    const publicProfilesQuery = await knex('player')
      .select('*')
      .where('is_profile_public', true);

    try {
      const publicProfiles: User[] = [];

      publicProfilesQuery.forEach((data: any) => {
        const userResult = User.create({
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

        if (userResult.isSuccess) {
          const user = userResult.getValue();

          if (user) {
            publicProfiles.push(user);
          }
        }
      });

      return Result.ok(publicProfiles);
    } catch (err) {
      return Result.fail('Cannot get public profiles');
    }
  }
}
