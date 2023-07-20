import * as bcrypt from 'bcryptjs';
import Result from '../../../../core/result';
import { District } from '../../../../domain/district';
import Guard from '../../../../core/guard';
import UserProfile from './user-profile';
import Nullable from '../../../../core/nullable';

export default class User {
  public readonly id: number;
  public readonly username: string;
  public email: Nullable<string>;
  public readonly password: string;
  public readonly isProfilePublic: boolean;
  public readonly createdAt: string;
  public readonly imageUrl: Nullable<string>;
  public readonly ntrpLevel: number;
  public readonly districts: District[];
  public readonly age: Nullable<number>;
  public readonly description: Nullable<string>;
  public readonly telegram: Nullable<string>;
  public readonly whatsapp: Nullable<string>;
  public readonly signal: Nullable<string>;

  private constructor(data: Partial<User>) {
    Object.assign(this, data);
  }

  // TODO: apply this create pattern to all other domain entities
  static create(data: Partial<User>): Result<User> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: data.id, argumentName: 'id' },
      { argument: data.username, argumentName: 'username' },
      { argument: data.email, argumentName: 'email' },
      { argument: data.districts, argumentName: 'districts' },
      { argument: data.isProfilePublic, argumentName: 'isProfilePublic' },
      { argument: data.password, argumentName: 'password' },
      { argument: data.createdAt, argumentName: 'createdAt' },
      { argument: data.ntrpLevel, argumentName: 'ntrpLevel' }
    ]);

    if (!guardResult.succeeded) {
      return Result.fail<User>(guardResult.message as string);
    }

    return Result.ok<User>(new User(data));
  }

  static hashPassword(password: string): string {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }

  comparePassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }

  toUserProfile({ withEmail }: { withEmail: boolean }): UserProfile {
    return new UserProfile(this, withEmail);
  }

  static stub({
    id = 1,
    username = 'jones',
    email = 'jones@gmail.com',
    password = 'abcd1234',
    isProfilePublic = false,
    createdAt = 'abcd',
    imageUrl = 'qwer',
    ntrpLevel = 3.5,
    age = 29,
    districts = [District.north, District.islands],
    description = 'description',
    telegram = '1213',
    whatsapp = '78123',
    signal = '123421'
  }: Partial<User>): Result<User> {
    return User.create({
      id,
      username,
      email,
      password,
      isProfilePublic,
      createdAt,
      imageUrl,
      ntrpLevel,
      age,
      districts,
      description,
      telegram,
      whatsapp,
      signal
    });
  }
}
