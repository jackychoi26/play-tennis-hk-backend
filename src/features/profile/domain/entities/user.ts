import * as bcrypt from 'bcryptjs';
import Result from '../../../../core/result';
import { District } from '../../../../domain/district';
import Guard from '../../../../core/guard';
import UserProfile from './user-profile';
import Nullable from '../../../../core/nullable';

export default class User {
  public readonly id: string;
  public readonly username: string;
  public readonly email: string;
  public readonly password: string;
  public readonly isProfilePublic: boolean;
  public readonly createdAt: string;
  public readonly imageUrl: string;
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

  static create(data: Partial<User>): Result<User> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: data.id, argumentName: 'id' },
      { argument: data.username, argumentName: 'username' },
      { argument: data.email, argumentName: 'email' },
      { argument: data.isProfilePublic, argumentName: 'isProfilePublic' },
      { argument: data.password, argumentName: 'password' },
      { argument: data.createdAt, argumentName: 'createdAt' },
      { argument: data.imageUrl, argumentName: 'imageUrl' },
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

  toUserProfile(): UserProfile {
    return new UserProfile(this);
  }

  static stub({
    id = 'abcd-1234',
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
