import TennisMatch from '../../entities/tennis-match';
import TennisMatchRepository from '../../../data/repositories/tennis-match-repository';
import Result from '../../../../../core/result';
import DeleteTennisMatch from '../delete-tennis-match';
import UserProfile from '../../../../profile/domain/entities/user-profile';

jest.mock('../../../data/repositories/tennis-match-repository');

const tennisMatchRepository: jest.Mocked<TennisMatchRepository> =
  new TennisMatchRepository() as any;

describe('Delete match failure', () => {
  beforeEach(() => {
    tennisMatchRepository.getTennisMatchById.mockClear();
    tennisMatchRepository.deleteTennisMatch.mockClear();
  });

  it('returns delete tennis match failure when no corresponding tennis match id in database', async () => {
    const deleteTennisMatch = new DeleteTennisMatch(tennisMatchRepository);

    tennisMatchRepository.getTennisMatchById.mockResolvedValueOnce(
      Result.fail('No tennis match found')
    );

    const result = await deleteTennisMatch.execute({
      userId: 1,
      tennisMatchId: 2
    });

    expect(tennisMatchRepository.getTennisMatchById).toBeCalledTimes(1);
    expect(tennisMatchRepository.getTennisMatchById).toBeCalledWith({
      tennisMatchId: 2
    });

    expect(result.message).toBe('DELETE_TENNIS_MATCH_FAILURE');
  });

  it('returns delete tennis match failure when tennis match id poster is not the same as user id', async () => {
    const deleteTennisMatch = new DeleteTennisMatch(tennisMatchRepository);

    tennisMatchRepository.getTennisMatchById.mockResolvedValueOnce(
      Result.ok(
        TennisMatch.stub({ id: 2, poster: new UserProfile({ id: 99 }) })
      )
    );

    const result = await deleteTennisMatch.execute({
      userId: 1,
      tennisMatchId: 2
    });

    expect(tennisMatchRepository.getTennisMatchById).toBeCalledTimes(1);
    expect(tennisMatchRepository.getTennisMatchById).toBeCalledWith({
      tennisMatchId: 2
    });

    expect(result.message).toBe('DELETE_TENNIS_MATCH_FAILURE');
  });
});

describe('Delete match success', () => {
  beforeEach(() => {
    tennisMatchRepository.getTennisMatchById.mockClear();
    tennisMatchRepository.deleteTennisMatch.mockClear();
  });

  it('returns delete tennis match success when tennis match can be found with the id and the poster id is equal to user id', async () => {
    const deleteTennisMatch = new DeleteTennisMatch(tennisMatchRepository);

    tennisMatchRepository.getTennisMatchById.mockResolvedValueOnce(
      Result.ok(
        TennisMatch.stub({ id: 2, poster: new UserProfile({ id: 99 }) })
      )
    );

    const result = await deleteTennisMatch.execute({
      userId: 99,
      tennisMatchId: 2
    });

    expect(tennisMatchRepository.getTennisMatchById).toBeCalledTimes(1);
    expect(tennisMatchRepository.getTennisMatchById).toBeCalledWith({
      tennisMatchId: 2
    });

    expect(tennisMatchRepository.deleteTennisMatch).toBeCalledTimes(1);
    expect(tennisMatchRepository.deleteTennisMatch).toBeCalledWith({
      tennisMatchId: 2
    });

    expect(result.message).toBe('DELETE_TENNIS_MATCH_SUCCESS');
  });
});
