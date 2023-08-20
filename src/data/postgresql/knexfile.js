export const development = {
  client: 'postgresql',
  connection: {
    host: 'localhost',
    port: 5432,
    database: 'quiz_site',
    user: 'quiz_site'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
}

export const production = {
  client: 'postgresql',
  connection: {
    host: 'postgres',
    port: 5432,
    database: 'quiz_site',
    user: 'quiz_site'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
}
