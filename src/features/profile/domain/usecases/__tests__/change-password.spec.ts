import JwtHelper from '@core/jwt-helper';
import Result from '../../../../../core/result';
import UserRepository from '../../../data/repositories/user-repository';
import User from '../../entities/user';
import ChangePassword from '../change-password';

jest.mock('../../../data/repositories/user-repository');

const repository: jest.Mocked<UserRepository> = new UserRepository() as any;

describe('Change password success', () => {
  beforeEach(() => {
    repository.getFirstUserById.mockClear();
    repository.updateUser.mockClear();
  });

  it('returns success when executed with correct input', async () => {
    const changePassword = new ChangePassword(repository);

    repository.getFirstUserById.mockResolvedValueOnce(User.stub({}));
    repository.updateUser.mockResolvedValueOnce(User.stub({}));

    const result = await changePassword.execute({
      id: 'abcd-123456',
      password: 'Abcd1234'
    });

    expect(result.type).toBe('CHANGE_PASSWORD_SUCCESS');

    expect(repository.getFirstUserById).toBeCalledTimes(1);
    expect(repository.getFirstUserById).toBeCalledWith({ id: 'abcd-123456' });

    expect(repository.updateUser).toBeCalledTimes(1);
  });
});

describe('Change password failure', () => {
  beforeEach(() => {
    repository.getFirstUserById.mockClear();
    repository.updateUser.mockClear();
  });

  it('returns failure when no user found for unknwon reasons', async () => {
    const changePassword = new ChangePassword(repository);

    repository.getFirstUserById.mockResolvedValueOnce(
      Result.fail<User>('User not found')
    );

    const result = await changePassword.execute({
      id: 'abcd-123456',
      password: 'Abcd1234567'
    });

    expect(result.type).toBe('CHANGE_PASSWORD_FAILURE');

    expect(repository.getFirstUserById).toBeCalledTimes(1);
    expect(repository.getFirstUserById).toBeCalledWith({ id: 'abcd-123456' });

    expect(repository.updateUser).not.toBeCalled();
  });

  it('returns failure when password is the same as old password', async () => {
    const changePassword = new ChangePassword(repository);

    repository.getFirstUserById.mockResolvedValueOnce(
      User.stub({ password: User.hashPassword('testing-password') })
    );

    const result = await changePassword.execute({
      id: 'abcd-123456',
      password: 'testing-password'
    });

    expect(result.type).toBe('SAME_PASSWORD_FAILURE');

    expect(repository.getFirstUserById).toBeCalledTimes(1);
    expect(repository.getFirstUserById).toBeCalledWith({ id: 'abcd-123456' });

    expect(repository.updateUser).not.toBeCalled();
  });
});
