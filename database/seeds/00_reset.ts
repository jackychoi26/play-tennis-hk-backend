import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('tennis_match').del();
  await knex('player').del();
}
