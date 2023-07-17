import User from '../../../profile/domain/entities/user';
import Result from '../../../../core/result';
import TennisMatch from '../entities/tennis-match';
import { MatchType } from '../../../../domain/match-type';
import { District } from '../../../../domain/district';

export interface SaveTennisMatchParam {
  user: User;
  ntrpLevel: number;
  startDateTime: Date;
  endDateTime: Date;
  district: District;
  matchType: MatchType;
  court: string;
  remarks?: string;
}

export default interface ITennisMatchRepository {
  getTennisMatches(): Promise<Result<TennisMatch[]>>;

  getTennisMatchById({
    tennisMatchId
  }: {
    tennisMatchId: number;
  }): Promise<Result<TennisMatch>>;

  saveMatch({
    user,
    ntrpLevel,
    startDateTime,
    endDateTime,
    district,
    matchType,
    court,
    remarks
  }: SaveTennisMatchParam): Promise<Result<TennisMatch>>;

  deleteTennisMatch({
    tennisMatchId
  }: {
    tennisMatchId: number;
  }): Promise<Result<void>>;
}
