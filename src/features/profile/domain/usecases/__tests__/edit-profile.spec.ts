import Result from '../../../../../core/result';
import UserRepository from '../../../data/repositories/user-repository';
import User from '../../entities/user';
import EditProfile from '../edit-profile';

jest.mock('../../../data/repositories/user-repository');

const repository: jest.Mocked<UserRepository> = new UserRepository() as any;

describe('Update user profile success', () => {
  beforeEach(() => {
    repository.getFirstUserById.mockClear();
    repository.updateUser.mockClear();
  });

  it('returns update profile success when executed with correct informaiton', async () => {
    const editProfile = new EditProfile(repository);

    repository.getFirstUserById.mockResolvedValueOnce(
      User.stub({ id: 'abcd-123456' })
    );

    repository.updateUser.mockResolvedValueOnce(User.stub({}));

    const result = await editProfile.execute({
      id: 'abcd-123456',
      description: 'testing',
      ustaLevel: 4.5
    });

    expect(result.message).toBe('EDIT_PROFILE_SUCCESS');

    if (result.message == 'EDIT_PROFILE_SUCCESS') {
      expect(result.user).toBeDefined();
    }

    expect(repository.getFirstUserById).toBeCalledTimes(1);
    expect(repository.getFirstUserById).toBeCalledWith({ id: 'abcd-123456' });

    expect(repository.updateUser).toBeCalledTimes(1);
    expect(repository.updateUser).toBeCalledWith({
      id: 'abcd-123456',
      description: 'testing',
      ustaLevel: 4.5
    });
  });
});

describe('Update user profile failure', () => {
  beforeEach(() => {
    repository.getFirstUserById.mockClear();
    repository.updateUser.mockClear();
  });

  it('returns failure when user is not found for unknown reasons', async () => {
    const editProfile = new EditProfile(repository);

    repository.getFirstUserById.mockResolvedValueOnce(
      Result.fail<User>('User not found')
    );

    const result = await editProfile.execute({
      id: 'abcd-123456',
      description: 'testing',
      ustaLevel: 4.5
    });

    expect(result.message).toBe('EDIT_PROFILE_FAILURE');

    expect(repository.getFirstUserById).toBeCalledTimes(1);
    expect(repository.getFirstUserById).toBeCalledWith({ id: 'abcd-123456' });

    expect(repository.updateUser).not.toBeCalled();
  });

  it('returns failure when profile cannot be edited for unknown reasons', async () => {
    const editProfile = new EditProfile(repository);

    repository.getFirstUserById.mockResolvedValueOnce(
      User.stub({ id: 'abcd-123456' })
    );

    repository.updateUser.mockResolvedValueOnce(
      Result.fail<User>('Cannot edit profile')
    );

    const result = await editProfile.execute({
      id: 'abcd-123456',
      description: 'testing',
      ustaLevel: 4.5
    });

    expect(result.message).toBe('EDIT_PROFILE_FAILURE');

    expect(repository.getFirstUserById).toBeCalledTimes(1);
    expect(repository.getFirstUserById).toBeCalledWith({ id: 'abcd-123456' });

    expect(repository.updateUser).toBeCalledTimes(1);

    expect(repository.updateUser).toBeCalledWith({
      id: 'abcd-123456',
      description: 'testing',
      ustaLevel: 4.5
    });
  });
});
