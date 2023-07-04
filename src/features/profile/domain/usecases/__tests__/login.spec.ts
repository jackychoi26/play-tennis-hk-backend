import Result from '../../../../../core/result';
import UserRepository from '../../../data/repositories/user-repository';
import User from '../../entities/user';
import Login, { LoginResult } from '../login';

jest.mock('../../../data/repositories/user-repository');

const repository: jest.Mocked<UserRepository> = new UserRepository() as any;

describe('User login with existing user record', () => {
  beforeEach(() => {
    repository.getFirstUserByUsername.mockClear();
  });

  test('return login success when password is correct', async () => {
    const login = new Login(repository);

    repository.getFirstUserByUsername.mockResolvedValueOnce(
      User.stub({ password: User.hashPassword('abcd1234') })
    );

    const result = await login.execute({
      username: 'jones',
      password: 'abcd1234'
    });

    expect(result.type).toBe('LOGIN_SUCCESS');
  });

  test('return login success and token when password is correct', async () => {
    const login = new Login(repository);

    repository.getFirstUserByUsername.mockResolvedValueOnce(
      User.stub({ password: User.hashPassword('abcd1234') })
    );

    const result = await login.execute({
      username: 'jones',
      password: 'abcd1234'
    });

    expect(result.type).toBe('LOGIN_SUCCESS');

    if (result.type == 'LOGIN_SUCCESS') {
      expect(result.token).toBeDefined();
    }
  });

  test('return login failure when password is incorrect', async () => {
    const login = new Login(repository);

    repository.getFirstUserByUsername.mockResolvedValueOnce(
      User.stub({ password: User.hashPassword('abcd1234') })
    );

    const result = await login.execute({
      username: 'jones',
      password: 'dcba4321'
    });

    expect(result.type).toBe('LOGIN_FAILURE');
  });
});

describe('User login without user record', () => {
  beforeEach(() => {
    repository.getFirstUserByUsername.mockClear();
  });

  test('return login failure when user does not exist', async () => {
    const login = new Login(repository);

    repository.getFirstUserByUsername.mockResolvedValueOnce(
      Result.fail<User>('User does not exist')
    );

    const result = await login.execute({
      username: 'jones',
      password: 'abcd1234'
    });

    expect(result.type).toBe('LOGIN_FAILURE');
  });
});
