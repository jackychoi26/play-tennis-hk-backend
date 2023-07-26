import UserProfile from '../../../profile/domain/entities/user-profile';
import Result from '../../../../core/result';
import TennisMatch from '../../domain/entities/tennis-match';
import ITennisMatchRepository, {
  SaveTennisMatchParam
} from '../../domain/repositories/i-tennis-match-repository';

const knex = require('../../../../../database/config').knex;

export default class TennisMatchRepository implements ITennisMatchRepository {
  async getTennisMatches(): Promise<Result<TennisMatch[]>> {
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
      ])
      .where('tennis_match.is_deleted', '=', false)
      .andWhere('tennis_match.end_date_time', '>', knex.fn.now())
      .orderBy('tennis_match.end_date_time', 'asc');

    const tennisMatches: TennisMatch[] = tennisMatchesQuery.map((data: any) => {
      const userProfile = new UserProfile({
        id: data.player_id,
        username: data.username,
        imageUrl: data.image_url,
        ntrpLevel: data.player_ntrp_level,
        districts: data.player_districts,
        age: data.age,
        isProfilePublic: data.is_profile_public,
        description: data.description,
        telegram: data.telegram,
        whatsapp: data.whatsapp,
        signal: data.signal
      });

      return new TennisMatch({
        id: data.tennis_match_id,
        createdAt: data.created_at,
        poster: userProfile,
        startDateTime: data.start_date_time,
        endDateTime: data.end_date_time,
        ntrpLevel: data.tennis_match_ntrp_level,
        district: data.tennis_match_district,
        court: data.court,
        matchType: data.match_type,
        remarks: data.remarks
      });
    });

    return Result.ok<TennisMatch[]>(tennisMatches);
  }

  async getTennisMatchesByUserId({
    userId
  }: {
    userId: number;
  }): Promise<Result<TennisMatch[]>> {
    const tennisMatchesQuery = await knex('tennis_match')
      .join('player', 'tennis_match.poster_id', '=', 'player.id')
      .select(
        'tennis_match.id as tennis_match_id',
        'tennis_match.district as tennis_match_district',
        'tennis_match.ntrp_level as tennis_match_ntrp_level',
        'player.id as player_id',
        'player.ntrp_level as player_ntrp_level',
        'player.districts as player_districts',
        '*'
      )
      .where('tennis_match.is_deleted', false)
      .andWhere('player.id', userId);

    const tennisMatches = tennisMatchesQuery.map((data: any) => {
      const userProfile = new UserProfile({
        id: data.player_id,
        username: data.username,
        imageUrl: data.image_url,
        ntrpLevel: data.player_ntrp_level,
        districts: data.player_districts,
        age: data.age,
        isProfilePublic: data.is_profile_public,
        description: data.description,
        telegram: data.telegram,
        whatsapp: data.whatsapp,
        signal: data.signal
      });

      return new TennisMatch({
        id: data.tennis_match_id,
        createdAt: data.created_at,
        poster: userProfile,
        startDateTime: data.start_date_time,
        endDateTime: data.end_date_time,
        ntrpLevel: data.tennis_match_ntrp_level,
        district: data.tennis_match_district,
        court: data.court,
        matchType: data.match_type,
        remarks: data.remarks
      });
    });

    return Result.ok(tennisMatches);
  }

  async getTennisMatchById({
    tennisMatchId
  }: {
    tennisMatchId: number;
  }): Promise<Result<TennisMatch>> {
    const tennisMatchQuery = await knex('tennis_match')
      .join('player', 'tennis_match.poster_id', '=', 'player.id')
      .select(
        'tennis_match.id as tennis_match_id',
        'tennis_match.district as tennis_match_district',
        'tennis_match.ntrp_level as tennis_match_ntrp_level',
        'player.id as player_id',
        'player.ntrp_level as player_ntrp_level',
        'player.districts as player_districts',
        'tennis_match.is_deleted as tennis_match_is_deleted',
        '*'
      )
      .where('tennis_match.id', '=', tennisMatchId)
      .andWhere('tennis_match.is_deleted', false)
      .limit(1);

    if (tennisMatchQuery.length > 0) {
      const data = tennisMatchQuery[0];

      const userProfile = new UserProfile({
        id: data.player_id,
        username: data.username,
        imageUrl: data.image_url,
        ntrpLevel: data.player_ntrp_level,
        districts: data.player_districts,
        age: data.age,
        isProfilePublic: data.is_profile_public,
        description: data.description,
        telegram: data.telegram,
        whatsapp: data.whatsapp,
        signal: data.signal
      });

      const tennisMatch = new TennisMatch({
        id: data.tennis_match_id,
        createdAt: data.created_at,
        poster: userProfile,
        startDateTime: data.start_date_time,
        endDateTime: data.end_date_time,
        ntrpLevel: data.tennis_match_ntrp_level,
        district: data.tennis_match_district,
        court: data.court,
        matchType: data.match_type,
        remarks: data.remarks
      });

      return Result.ok(tennisMatch);
    }

    return Result.fail('Unexpected error');
  }

  async saveTennisMatch({
    userId,
    ntrpLevel,
    startDateTime,
    endDateTime,
    district,
    matchType,
    court,
    remarks
  }: SaveTennisMatchParam): Promise<Result<TennisMatch>> {
    let tennisMatchSaveObject = Object.assign(
      {
        poster_id: userId,
        ntrp_level: ntrpLevel,
        start_date_time: startDateTime,
        end_date_time: endDateTime,
        district: district,
        match_type: matchType,
        court: court
      },
      remarks === undefined ? null : { remarks }
    );

    try {
      const tennisMatchCreation: [{ id: number }] = await knex('tennis_match')
        .insert(tennisMatchSaveObject)
        .returning('id');

      if (tennisMatchCreation && tennisMatchCreation.length > 0) {
        return this.getTennisMatchById({
          tennisMatchId: tennisMatchCreation[0].id
        });
      } else {
        return Result.fail('Cannot create tennis match');
      }
    } catch (err) {
      return Result.fail('Cannot create tennis match');
    }
  }

  async deleteTennisMatch({
    tennisMatchId
  }: {
    tennisMatchId: number;
  }): Promise<Result<void>> {
    const tennisMatchDeletion = await knex('tennis_match')
      .where('id', tennisMatchId)
      .update('is_deleted', 'true')
      .returning('*');

    if (tennisMatchDeletion) {
      return Result.ok();
    } else {
      return Result.fail('Cannot find the tennis match');
    }
  }
}
