module.exports = {
  development: {
    client: 'pg',
    connection: {
      host : "db",
      database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
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
