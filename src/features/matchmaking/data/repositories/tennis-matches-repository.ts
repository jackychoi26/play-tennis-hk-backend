import Result from 'core/result';
import TennisMatch from 'features/matchmaking/domain/entities/tennis-match';
import ITennisMatchesRepository, {
  SaveTennisMatchParam
} from 'features/matchmaking/domain/repositories/i-tennis-matches-repository';

export default class TennisMatchesRepository
  implements ITennisMatchesRepository
{
  getMatches(): Promise<Result<TennisMatch[]>> {
    throw new Error('Method not implemented.');
  }
  saveMatch({
    user,
    ustaLevelRange,
    startDateTime,
    endDateTime,
    district,
    matchType,
    court,
    remarks
  }: SaveTennisMatchParam): Promise<Result<TennisMatch>> {
    throw new Error('Method not implemented.');
  }
}
