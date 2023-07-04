import Result from '../../../../core/result';
import User from '../entities/user';

export interface CreateUserParam {
  username: string;
  email: string;
  password: string;
  imageUrl: string;
  ustaLevel: number;
  description?: string;
  telegram?: string;
  whatsapp?: string;
  signal?: string;
}

export default interface IUserRepository {
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
  }: CreateUserParam): Promise<Result<User>>;

  getFirstUserByEmail({ email }: { email: string }): Promise<Result<User>>;

  getFirstUserByUsername({
    username
  }: {
    username: string;
  }): Promise<Result<User>>;
}
