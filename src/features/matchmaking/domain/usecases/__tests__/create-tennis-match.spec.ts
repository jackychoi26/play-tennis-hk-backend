import TennisMatch from '../../entities/tennis-match';
import { District } from '../../../../../domain/district';
import { MatchType } from '../../../../../domain/match-type';
import UseCase from '../../../../../core/usecase';
import ITennisMatchesRepository from '../../repositories/i-tennis-matches-repository';
import IUserRepository from '../../../../../features/profile/domain/repositories/i-user-repository';
import User from '../../../../../features/profile/domain/entities/user';
import UserRepository from '../../../../profile/data/repositories/user-repository';
import TennisMatchesRepository from '../../../data/repositories/tennis-matches-repository';
import CreateTennisMatch from '../create-tennis-match';
import Result from '../../../../../core/result';

jest.mock('../../../../profile/data/repositories/user-repository');
jest.mock('../../../data/repositories/tennis-matches-repository');

const userRepository: jest.Mocked<UserRepository> = new UserRepository() as any;
const tennisMatchesRepository: jest.Mocked<TennisMatchesRepository> =
  new TennisMatchesRepository() as any;

describe('Create match failure', () => {
  beforeEach(() => {
    userRepository.getFirstUserById.mockClear();
    tennisMatchesRepository.getMatches.mockClear();
    tennisMatchesRepository.saveMatch.mockClear();
  });

  it('returns missing contact info failure when user does not have any contact info', async () => {
    const createTennisMatch = new CreateTennisMatch(
      tennisMatchesRepository,
      userRepository
    );

    userRepository.getFirstUserById.mockResolvedValueOnce(
      User.stub({ telegram: null })
    );

    const result = await createTennisMatch.execute({
      userId: 'abcd1234',
      ustaLevelRange: [3.0],
      startDateTime: new Date(),
      endDateTime: new Date(),
      district: District.kwunTong,
      matchType: MatchType.singles,
      court: 'Court'
    });

    expect(result.message).toBe('MISSING_CONTACT_INFO_FAILURE');
  });

  it('returns too many matches created failure when user creates more than 3 matches already', async () => {
    const createTennisMatch = new CreateTennisMatch(
      tennisMatchesRepository,
      userRepository
    );

    userRepository.getFirstUserById.mockResolvedValueOnce(
      User.stub({ telegram: 'Something' })
    );


    tennisMatchesRepository.getMatches.mockResolvedValueOnce(new Result<string>(isSuccess: true, value: "sjaiodj"))

    const result = await createTennisMatch.execute({
      userId: 'abcd1234',
      ustaLevelRange: [3.0],
      startDateTime: new Date(),
      endDateTime: new Date(),
      district: District.kwunTong,
      matchType: MatchType.singles,
      court: 'Court'
    });

    expect(result.message).toBe('TOO_MANY_MATCHES_CREATED');
  });
});
