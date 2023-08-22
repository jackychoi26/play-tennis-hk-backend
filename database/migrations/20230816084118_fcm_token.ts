import { Knex } from 'knex';
const { onUpdateTrigger } = require('../config');

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('fcm_token', (table) => {
      table.increments('id').primary();
      table.integer('player_id');
      table.foreign('player_id').references('id').inTable('player');
      table.string('token').notNullable();
      table.timestamps(true, true);
    })
    .then(() => knex.raw(onUpdateTrigger('fcm_token')));
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('fcm_token');
}
