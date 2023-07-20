import { District } from '../../../../domain/district';
import Result from '../../../../core/result';
import User from '../entities/user';

export interface CreateUserParam {
  username: string;
  email: string;
  password: string;
  isProfilePublic: boolean;
  districts: District[];
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
  isProfilePublic?: boolean;
  districts?: District[];
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
    districts,
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
    districts,
    description,
    telegram,
    whatsapp,
    signal
  }: UpdateUserParam): Promise<Result<User>>;

  getPublicUsers(): Promise<Result<User[]>>;
}
