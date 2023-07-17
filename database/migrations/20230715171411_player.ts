import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('player', (table) => {
    table.increments().primary();
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
    table.timestamps(true, true);
    table.boolean('is_deleted').notNullable().defaultTo(false);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('player');
}
