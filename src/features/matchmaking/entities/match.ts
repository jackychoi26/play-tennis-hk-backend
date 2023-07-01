export class Match {
  constructor(
    public id: string,
    public createdAt: Date,
    // Person who created the post
    public poster: string,
    public ustaLevelRange: [number, number],
    public startDateTime: Date,
    public endDateTime: Date,
    public location: string,
    public remark?: string
  ) {}

  static stub(): Match {
    return new Match(
      'abcd-efhg-1234',
      new Date(),
      'efdg-1rf3-41ff',
      [3.0, 4.5],
      new Date(),
      new Date(),
      'Tai Po',
      ''
    );
  }
}
