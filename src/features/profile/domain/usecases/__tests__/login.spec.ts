import UserRepository from '../../../data/repositories/user-repository';
import Login from '../login';

// jest.mock('../../../data/repositories/user-repository');

describe('User login with valid username', () => {
  test('should throw error', async () => {
    const login = new Login(new UserRepository());

    const promise = login.execute({
      username: 'sadsads',
      password: 'jsadjwiqo'
    });

    await expect(promise).rejects.toThrow('User not existed');
  });
});
