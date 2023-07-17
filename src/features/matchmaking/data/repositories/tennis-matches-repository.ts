import UserProfile from '../../../profile/domain/entities/user-profile';
import Result from '../../../../core/result';
import TennisMatch from '../../domain/entities/tennis-match';
import ITennisMatchesRepository, {
  SaveTennisMatchParam
} from '../../domain/repositories/i-tennis-matches-repository';

const knex = require('../../../../../database/config').knex;
export default class TennisMatchesRepository
  implements ITennisMatchesRepository
{
  async getMatches(): Promise<Result<TennisMatch[]>> {
    try {
      const tennisMatchesQuery = await knex('player')
        .join('tennis_match', 'player.id', '=', 'tennis_match.poster_id')
        .select([
          'tennis_match.id as tennis_match_id',
          'tennis_match.district as tennis_match_district',
          'tennis_match.ntrp_level as tennis_match_ntrp_level',
          'player.id as player_id',
          'player.ntrp_level as player_ntrp_level',
          'player.districts as player_districts',
          '*'
        ]);

      const tennisMatches: TennisMatch[] = tennisMatchesQuery.map(
        (queryData: any) => {
          console.log(queryData);

          const userProfile = new UserProfile({
            id: queryData.player_id,
            username: queryData.username,
            email: queryData.email,
            imageUrl: queryData.image_url,
            ntrpLevel: queryData.player_ntrp_level,
            districts: queryData.player_districts,
            age: queryData.age,
            isProfilePublic: queryData.is_profile_public,
            description: queryData.description,
            telegram: queryData.telegram,
            whatsapp: queryData.whatsapp,
            signal: queryData.signal
          });

          return new TennisMatch({
            id: queryData.tennis_match_id,
            createdAt: queryData.created_at,
            poster: userProfile,
            startDateTime: queryData.start_date_time,
            endDateTime: queryData.end_date_time,
            ntrpLevel: queryData.tennis_match_ntrp_level,
            district: queryData.tennis_match_district,
            court: queryData.court,
            matchType: queryData.match_type,
            remarks: queryData.remarks
          });
        }
      );

      return Result.ok<TennisMatch[]>(tennisMatches);
    } catch (err) {
      throw err;
    }
  }
  saveMatch({
    user,
    ntrpLevel,
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
