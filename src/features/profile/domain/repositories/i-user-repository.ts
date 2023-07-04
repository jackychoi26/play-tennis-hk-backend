import User from '../entities/user';

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
  }: CreateUserParam): Promise<User>;

  getFirstUserByEmail({ email }: { email: string }): Promise<User>;

  getFirstUserByUsername({ username }: { username: string }): Promise<User>;
}

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