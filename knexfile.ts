module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: 'play_tennis_hk',
      user: 'choikinlung',
      password: '',
      port: 5432
    },
    migrations: {
      directory: `${__dirname}/database/migrations`
    },
    seeds: {
      directory: `${__dirname}/database/seeds`
    }
  },
  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
