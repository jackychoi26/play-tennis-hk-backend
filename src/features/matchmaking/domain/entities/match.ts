import { District } from '../../../../domain/district';
import { MatchType } from '../../../../domain/match-type';

export class Match {
  constructor(
    public id: string,
    public createdAt: Date,
    // Person who created the post
    public poster: string,
    public ustaLevelRange: number[],
    public startDateTime: Date,
    public endDateTime: Date,
    public district: District,
    public court: string,
    public matchType: MatchType,
    public remarks?: string
  ) {}

  static stub({
    id = 'abcd-1234',
    createdAt = new Date(),
    poster = 'efgt-9876',
    ustaLevelRange = [3.5, 4],
    startDateTime = new Date(),
    endDateTime = new Date(),
    district = District.taiPo,
    court = '運頭塘',
    matchType = MatchType.mensSingles,
    remarks = 'Please bring your own racquest'
  }: {
    id?: string;
    createdAt?: Date;
    poster?: string;
    ustaLevelRange?: number[];
    startDateTime?: Date;
    endDateTime?: Date;
    district?: District;
    court?: string;
    matchType?: MatchType;
    remarks?: string;
  }): Match {
    return new Match(
      id,
      createdAt,
      poster,
      ustaLevelRange,
      startDateTime,
      endDateTime,
      district,
      court,
      matchType,
      remarks
    );
  }
}
