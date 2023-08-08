import { Knex } from 'knex';
const { onUpdateTrigger } = require('../config');

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('tennis_match', (table) => {
      table.increments('id').primary();
      table.integer('poster_id');
      table.foreign('poster_id').references('id').inTable('player');
      table.float('ntrp_level', 1).notNullable();
      table.dateTime('start_date_time').notNullable();
      table.dateTime('end_date_time').notNullable();
      table.string('district').notNullable();
      table.string('match_type').notNullable();
      table.string('court').notNullable();
      table.string('remarks');
      table.timestamps(true, true);
      table.boolean('is_deleted').notNullable().defaultTo(false);
    })
    .then(() => knex.raw(onUpdateTrigger('tennis_match')));
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('tennis_match');
}
