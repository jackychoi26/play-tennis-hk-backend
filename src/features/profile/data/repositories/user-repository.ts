import Result from '../../../../core/result';
import User from '../../domain/entities/user';
import IUserRepository, {
  CreateUserParam,
  UpdateUserParam
} from '../../domain/repositories/i-user-repository';
const knex = require('../../../../../database/config').knex;
import logger from '../../../../core/logger';

export default class UserRepository implements IUserRepository {
  async createUser({
    username,
    email,
    password,
    imageUrl,
    isProfilePublic,
    age,
    ntrpLevel,
    description,
    districts,
    telegram,
    whatsapp,
    signal
  }: CreateUserParam): Promise<Result<User>> {
    let userRegistrationObject = Object.assign(
      {
        username,
        email,
        password,
        districts,
        is_profile_public: isProfilePublic,
        ntrp_level: ntrpLevel
      },
      imageUrl === undefined ? null : { image_url: imageUrl },
      description === undefined ? null : { description },
      age === undefined ? null : { age },
      telegram === undefined ? null : { telegram },
      whatsapp === undefined ? null : { whatsapp },
      signal === undefined ? null : { signal }
    );

    let userCreation: any;

    userCreation = await knex('player')
      .insert(userRegistrationObject)
      .returning('*');

    if (userCreation && userCreation.length > 0) {
      const data = userCreation[0];
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
      logger.warning('[user-repository]: cannot create user');
      return Result.fail('Something went wrong');
    }
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
      .whereRaw('LOWER(email) = LOWER(?)', email)
      .andWhere('is_deleted', false)
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

  async getFirstUserByUsername({
    username
  }: {
    username: string;
  }): Promise<Result<User>> {
    const userQuery = await knex('player')
      .select('*')
      .whereRaw('LOWER(username) = LOWER(?)', username)
      .andWhere('is_deleted', false)
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
    isProfilePublic,
    description,
    districts,
    age,
    telegram,
    whatsapp,
    signal
  }: UpdateUserParam): Promise<Result<User>> {
    let newUserProfileObject = Object.assign(
      {},
      password === undefined ? null : { password },
      imageUrl === undefined ? null : { image_url: imageUrl },
      ntrpLevel === undefined ? null : { ntrp_level: ntrpLevel },
      isProfilePublic === undefined
        ? null
        : { is_profile_public: isProfilePublic },
      description === undefined ? null : { description },
      districts === undefined ? null : { districts },
      age === undefined ? null : { age },
      telegram === undefined ? null : { telegram },
      whatsapp === undefined ? null : { whatsapp },
      signal === undefined ? null : { signal }
    );

    const userUpdate = await knex('player')
      .where('id', id)
      .andWhere('is_deleted', false)
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

  async getPublicUsers(offset: number): Promise<Result<User[]>> {
    const publicProfilesQuery = await knex('player')
      .select('*')
      .where('is_profile_public', true)
      .andWhere('is_deleted', false)
      .orderBy('updated_at', 'desc')
      .limit(10)
      .offset(offset);

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
  }

  async deleteAccount(id: number): Promise<void> {
    await knex('player').where('id', id).update({ is_deleted: true });
  }
}
