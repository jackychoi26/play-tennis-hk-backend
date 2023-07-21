import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Inserts seed entries
  await knex('player').insert([
    {
      username: 'Hemingway',
      email: 'hemingway@gmail.com',
      age: 35,
      is_profile_public: true,
      districts: ['NORTH', 'KWAI_TSING'],
      password: '$2a$10$6GiQdMojAYUhg.YAbvxTuOZGmTunYNgNWVHaCAhYxc6EU8OT4QhOa',
      ntrp_level: 3.5,
      telegram: 'hemingway'
    },
    {
      username: 'Fitzgerald',
      email: 'fitzgerald@gmail.com',
      districts: ['KOWLOON_CITY', 'SHAM_SHUI_PO'],
      is_profile_public: true,
      password: '$2a$10$tbeN2ZKZgPPXW06aEKK.DuWtVhwdGoOiFL0fUCToKvNSCf1jfrDFC',
      ntrp_level: 5.0,
      description: 'Hello, I am a novelist',
      signal: '+852 6123 4213'
    },
    {
      username: 'Calvino',
      email: 'calvino@gmail.com',
      is_profile_public: false,
      districts: ['SOUTHERN'],
      password: '$2a$10$UWK3P8F.W1X1uWi/rBFxweuBRxiBq9Q3iVXwLr88TzUgIveXrb3K.',
      ntrp_level: 2.5,
      whatsapp: '+852 5132 4123'
    }
  ]);
}
