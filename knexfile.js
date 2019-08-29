module.exports = {
  development: {
    client: 'mysql',
    connection: {
      port: 3306,
      host: 'localhost',
      database: 'test',
      user: 'root',
      password: '',
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },
}