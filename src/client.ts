import * as Knex from 'knex';
import * as Bookshelf from 'bookshelf';

const dbConfig = {
  client: 'mysql',
  connection: {
    host     : '127.0.0.1',
    user     : 'root',
    password : '',
    database : 'test',
    charset  : 'utf8'
  }
};

const knex: Knex = Knex(dbConfig);
const db: Bookshelf = Bookshelf(knex as any);

export default db;
