export class Match {
  constructor(
    public id: string,
    public createdAt: Date,
    // Person who created the post
    public poster: string,
    public ustaLevelRange: number[],
    public startDateTime: Date,
    public endDateTime: Date,
    public district: string,
    public court: string,
    public remarks?: string
  ) {}

  static stub({
    id = 'abcd-1234',
    createdAt = new Date(),
    poster = 'efgt-9876',
    ustaLevelRange = [3.5, 4],
    startDateTime = new Date(),
    endDateTime = new Date(),
    district = 'TAI_PO',
    court = '運頭塘',
    remarks = 'Please bring your own racquest'
  }: {
    id?: string;
    createdAt?: Date;
    poster?: string;
    ustaLevelRange?: number[];
    startDateTime?: Date;
    endDateTime?: Date;
    district?: string;
    court?: string;
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
      remarks
    );
  }
}
