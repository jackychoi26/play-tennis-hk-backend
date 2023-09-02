import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Inserts seed entries
  const entries = Array.from({ length: 15 }).map((_, index) => ({
    poster_id: 1,
    ntrp_level: 4.0,
    start_date_time: knex.fn.now(),
    end_date_time: knex.raw('CURRENT_TIMESTAMP + INTERVAL \'10 DAY\''),
    district: 'NORTH',
    match_type: 'SINGLES',
    court: '北區運動場',
    remarks: `Sample remark #${index + 1}`
  }));

  await knex('tennis_match').insert(entries);
}