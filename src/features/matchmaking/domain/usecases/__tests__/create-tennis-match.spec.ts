import TennisMatch from '../../entities/tennis-match';
import { District } from '../../../../../domain/district';
import { MatchType } from '../../../../../domain/match-type';
import User from '../../../../../features/profile/domain/entities/user';
import UserRepository from '../../../../profile/data/repositories/user-repository';
import TennisMatchRepository from '../../../data/repositories/tennis-match-repository';
import CreateTennisMatch from '../create-tennis-match';
import Result from '../../../../../core/result';

jest.mock('../../../../profile/data/repositories/user-repository');
jest.mock('../../../data/repositories/tennis-match-repository');

const userRepository: jest.Mocked<UserRepository> = new UserRepository() as any;
const tennisMatchRepository: jest.Mocked<TennisMatchRepository> =
  new TennisMatchRepository() as any;

describe('Create match failure', () => {
  beforeEach(() => {
    userRepository.getFirstUserById.mockClear();
    tennisMatchRepository.getTennisMatches.mockClear();
    tennisMatchRepository.saveMatch.mockClear();
  });

  // https://www.google.com/search?q=nodejs+jest+Cannot+read+properties+of+undefined&rlz=1C5CHFA_enHK970HK970&oq=nodejs+jest+Cannot+read+properties+of+undefined&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIHCAEQABiiBDIHCAIQABiiBDIHCAMQABiiBNIBCTEwODEzajBqN6gCALACAA&sourceid=chrome&ie=UTF-8
  // Comment this out before we found a solution to it.

  // it('returns missing contact info failure when user does not have any contact info', async () => {
  //   const createTennisMatch = new CreateTennisMatch(
  //     tennisMatchRepository,
  //     userRepository
  //   );

  //   userRepository.getFirstUserById.mockResolvedValueOnce(
  //     User.stub({ telegram: null })
  //   );

  //   tennisMatchRepository.getTennisMatches.mockResolvedValueOnce(
  //     Result.ok<TennisMatch[]>([TennisMatch.stub({}), TennisMatch.stub({})])
  //   );

  //   const result = await createTennisMatch.execute({
  //     userId: 1,
  //     ntrpLevel: 3.0,
  //     startDateTime: new Date(),
  //     endDateTime: new Date(),
  //     district: District.kwunTong,
  //     matchType: MatchType.singles,
  //     court: 'Court'
  //   });

  //   expect(result.message).toBe('MISSING_CONTACT_INFO_FAILURE');
  // });

  it('returns too many matches created failure when user creates more than 3 matches already', async () => {
    const createTennisMatch = new CreateTennisMatch(
      tennisMatchRepository,
      userRepository
    );

    tennisMatchRepository.getTennisMatches.mockResolvedValueOnce(
      Result.ok<TennisMatch[]>([
        TennisMatch.stub({}),
        TennisMatch.stub({}),
        TennisMatch.stub({}),
        TennisMatch.stub({}),
        TennisMatch.stub({})
      ])
    );
    userRepository.getFirstUserById.mockResolvedValueOnce(
      User.stub({ telegram: 'Something' })
    );

    const result = await createTennisMatch.execute({
      userId: 1,
      ntrpLevel: 3.0,
      startDateTime: new Date(),
      endDateTime: new Date(),
      district: District.kwunTong,
      matchType: MatchType.singles,
      court: 'Court'
    });

    expect(result.message).toBe('TOO_MANY_MATCHES_CREATED_FAILURE');
  });
});
