import Register from '../register';
import UserRepository from '../../../data/repositories/user-repository';
import Result from '../../../../../core/result';
import User from '../../entities/user';

jest.mock('../../../data/repositories/user-repository');

const repository: jest.Mocked<UserRepository> = new UserRepository() as any;

describe('Register with unique username or email', () => {
  beforeEach(() => {
    repository.getFirstUserByEmail.mockClear();
    repository.getFirstUserByUsername.mockClear();
    repository.createUser.mockClear();
  });

  it('return register success when user inputs information correctly', async () => {
    const register = new Register(repository);

    repository.getFirstUserByEmail.mockResolvedValueOnce(
      Result.fail<User>('User not found')
    );

    repository.getFirstUserByUsername.mockResolvedValueOnce(
      Result.fail<User>('User not found')
    );

    repository.createUser.mockResolvedValueOnce(
      User.stub({
        username: 'tennisking',
        email: 'jones@gmail.com',
        ustaLevel: 3.5,
        password: 'abcd1234',
        imageUrl: 'abcd1234'
      })
    );

    const result = await register.execute({
      username: 'tennisking',
      email: 'jones@gmail.com',
      ustaLevel: 3.5,
      password: 'abcd1234',
      imageUrl: 'abcd1234'
    });

    expect(result.type).toBe('REGISTER_SUCCESS');

    expect(repository.getFirstUserByUsername).toBeCalledTimes(1);
    expect(repository.getFirstUserByUsername).toBeCalledWith({
      username: 'tennisking'
    });

    expect(repository.getFirstUserByEmail).toBeCalledTimes(1);
    expect(repository.getFirstUserByEmail).toBeCalledWith({
      email: 'jones@gmail.com'
    });

    expect(repository.createUser).toBeCalledTimes(1);
    expect(repository.createUser).toBeCalledWith({
      username: 'tennisking',
      email: 'jones@gmail.com',
      ustaLevel: 3.5,
      password: 'abcd1234',
      imageUrl: 'abcd1234'
    });

    if (result.type === 'REGISTER_SUCCESS') {
      expect(result.type).toBeDefined();
    }
  });
});

describe('Register with an existing username or email', () => {
  beforeEach(() => {
    repository.getFirstUserByEmail.mockClear();
    repository.getFirstUserByUsername.mockClear();
    repository.createUser.mockClear();
  });

  it('return register failure when user inputs an existing username', async () => {
    const register = new Register(repository);

    repository.getFirstUserByUsername.mockResolvedValueOnce(User.stub({}));

    const result = await register.execute({
      username: 'tennisking',
      email: 'jones@gmail.com',
      ustaLevel: 3.5,
      password: 'abcd1234',
      imageUrl: 'abcd1234'
    });

    expect(repository.getFirstUserByUsername).toBeCalledTimes(1);
    expect(repository.getFirstUserByUsername).toBeCalledWith({
      username: 'tennisking'
    });

    expect(repository.getFirstUserByEmail).not.toBeCalled();

    expect(result.type).toBe('USERNAME_ALREADY_EXISTED_FAILURE');
  });

  it('return register failure when user inputs an existing email', async () => {
    const register = new Register(repository);

    repository.getFirstUserByUsername.mockResolvedValueOnce(
      Result.fail<User>('User not exited')
    );

    repository.getFirstUserByEmail.mockResolvedValueOnce(User.stub({}));

    const result = await register.execute({
      username: 'tennisking',
      email: 'jones@gmail.com',
      ustaLevel: 3.5,
      password: 'abcd1234',
      imageUrl: 'abcd1234'
    });

    expect(repository.getFirstUserByUsername).toBeCalledTimes(1);
    expect(repository.getFirstUserByUsername).toBeCalledWith({
      username: 'tennisking'
    });

    expect(repository.getFirstUserByEmail).toBeCalledTimes(1);
    expect(repository.getFirstUserByEmail).toBeCalledWith({
      email: 'jones@gmail.com'
    });

    expect(repository.createUser).not.toBeCalled();

    expect(result.type).toBe('EMAIL_ALREADY_EXISTED_FAILURE');
  });
});
