import User from '../../../../features/profile/domain/entities/user';
import { District } from '../../../../domain/district';
import { MatchType } from '../../../../domain/match-type';
import UserProfile from '../../../profile/domain/entities/user-profile';
import Nullable from '../../../../core/nullable';

export default class TennisMatch {
  public readonly id: number;
  public readonly createdAt: Date;
  // Person who created the post
  public readonly poster: UserProfile;
  public readonly ntrpLevel: number;
  public readonly startDateTime: Date;
  public readonly endDateTime: Date;
  public readonly district: District;
  public readonly court: string;
  public readonly matchType: MatchType;
  public readonly remarks: Nullable<string>;

  constructor(data: Partial<TennisMatch>) {
    Object.assign(this, data);
  }

  static stub({
    id = 1,
    createdAt = new Date(),
    poster = User.stub({}).getValue()!,
    ntrpLevel = 3.5,
    startDateTime = new Date(),
    endDateTime = new Date(),
    district = District.taiPo,
    court = '運頭塘',
    matchType = MatchType.mensSingles,
    remarks = 'Please bring your own racquest'
  }: {
    id?: number;
    createdAt?: Date;
    poster?: UserProfile;
    ntrpLevel?: number;
    startDateTime?: Date;
    endDateTime?: Date;
    district?: District;
    court?: string;
    matchType?: MatchType;
    remarks?: string;
  }): TennisMatch {
    return new TennisMatch({
      id,
      createdAt,
      poster,
      ntrpLevel,
      startDateTime,
      endDateTime,
      district,
      court,
      matchType,
      remarks
    });
  }
}
