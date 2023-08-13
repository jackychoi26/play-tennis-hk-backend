import Result from '../../../../core/result';
import TennisMatch from '../entities/tennis-match';
import { MatchType } from '../../../../domain/match-type';
import { District } from '../../../../domain/district';

export interface SaveTennisMatchParam {
  userId: number;
  ntrpLevel: number;
  startDateTime: Date;
  endDateTime: Date;
  district: District;
  matchType: MatchType;
  court: string;
  remarks?: string;
}

export default interface ITennisMatchRepository {
  getTennisMatches({
    offset,
    lowerNtrpLevel,
    upperNtrpLevel,
    selectedDistricts
  }: {
    offset: number;
    lowerNtrpLevel: number;
    upperNtrpLevel: number;
    selectedDistricts: District[];
  }): Promise<Result<TennisMatch[]>>;

  getTennisMatchById({
    tennisMatchId
  }: {
    tennisMatchId: number;
  }): Promise<Result<TennisMatch>>;

  getTennisMatchesByUserId({
    userId
  }: {
    userId: number;
  }): Promise<Result<TennisMatch[]>>;

  saveTennisMatch({
    userId,
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
