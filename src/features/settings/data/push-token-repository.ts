import Result from '../../../core/result';
import IPushTokenRepository from '../domain/repositories/i-push-token-repository';
const knex = require('../../../../database/config').knex;

export default class PushTokenRepository implements IPushTokenRepository {
  async getTokenByUserId({ id }: { id: number }): Promise<Result<string>> {
    const query = await knex('fcm_token')
      .select('*')
      .first()
      .where('player_id', id);

    if (query != null) {
      return Result.ok(query.token);
    } else {
      return Result.fail('Cannot find the token');
    }
  }

  async saveToken({
    pushToken,
    id
  }: {
    pushToken: string;
    id: number;
  }): Promise<Result<void>> {
    try {
      await knex('fcm_token').insert({
        player_id: id,
        token: pushToken
      });

      return Result.ok();
    } catch {
      return Result.fail('Cannot insert token');
    }
  }

  async updateToken({
    id,
    pushToken
  }: {
    id: number;
    pushToken: string;
  }): Promise<Result<void>> {
    try {
      await knex('fcm_token').update('token', pushToken).where('player_id', id);

      return Result.ok();
    } catch {
      return Result.fail('Cannot update token');
    }
  }
}
