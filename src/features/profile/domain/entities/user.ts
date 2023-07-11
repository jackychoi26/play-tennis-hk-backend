import * as bcrypt from 'bcryptjs';
import Guard from '@core/guard';
import Result from '@core/result';
import { District } from '../../../../domain/district';

export default class User {
  public readonly id: string;
  public readonly username: string;
  public readonly email: string;
  public readonly password: string;
  public readonly createdAt: string;
  public readonly imageUrl: string;
  public readonly ustaLevel: number;
  public readonly age?: number;
  public readonly districts: District[];
  public readonly description?: string;
  public readonly telegram?: string;
  public readonly whatsapp?: string;
  public readonly signal?: string;

  private constructor(data: Partial<User>) {
    Object.assign(this, data);
  }

  static create(data: Partial<User>): Result<User> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: data.id, argumentName: 'id' },
      { argument: data.username, argumentName: 'username' },
      { argument: data.email, argumentName: 'email' },
      { argument: data.password, argumentName: 'password' },
      { argument: data.createdAt, argumentName: 'createdAt' },
      { argument: data.imageUrl, argumentName: 'imageUrl' },
      { argument: data.ustaLevel, argumentName: 'ustaLevel' }
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

  static stub({
    id = 'abcd-1234',
    username = 'jones',
    email = 'jones@gmail.com',
    password = 'abcd1234',
    createdAt = 'abcd',
    imageUrl = 'qwer',
    ustaLevel = 3.5,
    age = 29,
    districts = [District.north, District.islands],
    description = 'description',
    telegram = 'clo',
    whatsapp = '1234567',
    signal = '7654321'
  }): Result<User> {
    return User.create({
      id,
      username,
      email,
      password,
      createdAt,
      imageUrl,
      ustaLevel,
      age,
      districts,
      description,
      telegram,
      whatsapp,
      signal
    });
  }
}
