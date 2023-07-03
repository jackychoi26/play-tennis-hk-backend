import UserRepository from '../../../data/repositories/user-repository';
import User from '../../entities/user';
import Login from '../login';

jest.mock('../../../data/repositories/user-repository');

const repository: jest.Mocked<UserRepository> = new UserRepository() as any;

describe('User login with existing user record', () => {
  beforeEach(() => {
    repository.getFirstUserByUsername.mockClear();
  });

  test('should throw error', async () => {
    const login = new Login(repository);

    repository.getFirstUserByUsername.mockResolvedValueOnce(
      User.stub({ password: User.hashPassword('abcd1234') })
    );

    const promise = login.execute({
      username: 'jones',
      password: 'abcd1234'
    });

    await expect(promise).rejects.toThrow('User not existed');
  });
});
