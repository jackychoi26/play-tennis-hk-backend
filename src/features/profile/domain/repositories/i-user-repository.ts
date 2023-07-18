import Result from '../../../../core/result';
import User from '../entities/user';

export interface CreateUserParam {
  username: string;
  email: string;
  password: string;
  isProfilePublic: boolean;
  imageUrl?: string;
  ntrpLevel: number;
  description?: string;
  telegram?: string;
  whatsapp?: string;
  signal?: string;
}

export interface UpdateUserParam {
  id: number;
  password?: string;
  imageUrl?: string;
  ntrpLevel?: number;
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
    isProfilePublic,
    imageUrl,
    ntrpLevel,
    description,
    telegram,
    whatsapp,
    signal
  }: CreateUserParam): Promise<Result<User>>;

  getFirstUserById({ id }: { id: number }): Promise<Result<User>>;

  getFirstUserByEmail({ email }: { email: string }): Promise<Result<User>>;

  getFirstUserByUsername({
    username
  }: {
    username: string;
  }): Promise<Result<User>>;

  updateUser({
    id,
    imageUrl,
    ntrpLevel,
    description,
    telegram,
    whatsapp,
    signal
  }: UpdateUserParam): Promise<Result<User>>;

  getPublicUsers(): Promise<Result<User[]>>;
}
