import TennisMatch from '../../entities/tennis-match';
import TennisMatchRepository from '../../../data/repositories/tennis-match-repository';
import Result from '../../../../../core/result';
import DeleteTennisMatch from '../delete-tennis-match';
import UserProfile from '../../../../profile/domain/entities/user-profile';
import GetTennisMatchByUserId from '../get-tennis-matches-by-user-id';

jest.mock('../../../data/repositories/tennis-match-repository');

const tennisMatchRepository: jest.Mocked<TennisMatchRepository> =
  new TennisMatchRepository() as any;

describe('Get tennis matches by user id success', () => {
  beforeEach(() => {
    tennisMatchRepository.getTennisMatchesByUserId.mockClear();
  });

  it('returns get tennis matches by user id success when an empty array is returned', async () => {
    const getTennisMatchByUserId = new GetTennisMatchByUserId(
      tennisMatchRepository
    );

    tennisMatchRepository.getTennisMatchesByUserId.mockResolvedValueOnce(
      Result.ok<TennisMatch[]>([])
    );

    const result = await getTennisMatchByUserId.execute({ userId: 1 });

    expect(tennisMatchRepository.getTennisMatchesByUserId).toBeCalledTimes(1);
    expect(tennisMatchRepository.getTennisMatchesByUserId).toBeCalledWith({
      userId: 1
    });

    expect(result.message).toBe('GET_TENNIS_MATCHES_BY_USER_ID_SUCCESS');
  });

  it('returns get tennis matches by user id success when an array of tennis matches is returned', async () => {
    const getTennisMatchByUserId = new GetTennisMatchByUserId(
      tennisMatchRepository
    );

    tennisMatchRepository.getTennisMatchesByUserId.mockResolvedValueOnce(
      Result.ok<TennisMatch[]>([
        TennisMatch.stub({}),
        TennisMatch.stub({}),
        TennisMatch.stub({}),
        TennisMatch.stub({})
      ])
    );

    const result = await getTennisMatchByUserId.execute({ userId: 1 });

    expect(tennisMatchRepository.getTennisMatchesByUserId).toBeCalledTimes(1);
    expect(tennisMatchRepository.getTennisMatchesByUserId).toBeCalledWith({
      userId: 1
    });

    expect(result.message).toBe('GET_TENNIS_MATCHES_BY_USER_ID_SUCCESS');
  });
});

describe('Get tennis matches by user id failure', () => {
  beforeEach(() => {
    tennisMatchRepository.getTennisMatchesByUserId.mockClear();
  });

  it('returns get tennis matches by user id failure when repository return result failure', async () => {
    const getTennisMatchByUserId = new GetTennisMatchByUserId(
      tennisMatchRepository
    );

    tennisMatchRepository.getTennisMatchesByUserId.mockResolvedValueOnce(
      Result.fail('Fail to get tennis matches')
    );

    const result = await getTennisMatchByUserId.execute({ userId: 1 });

    expect(tennisMatchRepository.getTennisMatchesByUserId).toBeCalledTimes(1);
    expect(tennisMatchRepository.getTennisMatchesByUserId).toBeCalledWith({
      userId: 1
    });

    expect(result.message).toBe('GET_TENNIS_MATCHES_BY_USER_ID_FAILURE');
  });
});
