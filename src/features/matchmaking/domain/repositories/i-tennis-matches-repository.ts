import User from '../../../../features/profile/domain/entities/user';
import Result from '../../../../core/result';
import TennisMatch from '../entities/tennis-match';
import { MatchType } from '../../../../domain/match-type';
import { District } from '../../../../domain/district';

export interface SaveTennisMatchParam {
  user: User;
  ustaLevelRange: number[];
  startDateTime: Date;
  endDateTime: Date;
  district: District;
  matchType: MatchType;
  court: string;
  remarks?: string;
}

export default interface ITennisMatchesRepository {
  getMatches(): Promise<Result<TennisMatch[]>>;

  saveMatch({
    user,
    ustaLevelRange,
    startDateTime,
    endDateTime,
    district,
    matchType,
    court,
    remarks
  }: SaveTennisMatchParam): Promise<Result<TennisMatch>>;
}
