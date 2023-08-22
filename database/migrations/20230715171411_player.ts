import { Knex } from 'knex';
const { onUpdateTrigger } = require('../config');

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('player', (table) => {
      table.increments('id').primary();
      table.string('username').notNullable();
      table.string('email').notNullable();
      table.boolean('is_profile_public');
      table.integer('age');
      table.specificType('districts', 'text ARRAY');
      table.string('image_url');
      table.string('password').notNullable();
      table.float('ntrp_level', 1).notNullable();
      table.string('description');
      table.string('telegram');
      table.string('whatsapp');
      table.string('signal');
      table.boolean('notify_bad_weather').defaultTo(false);
      table.boolean('notify_new_qualifying_tennis_match').defaultTo(false);
      table.boolean('notify_new_qualifying_player').defaultTo(false);
      table.timestamps(true, true);
      table.boolean('is_deleted').notNullable().defaultTo(false);
    })
    .then(() => knex.raw(onUpdateTrigger('player')));
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('player');
}
