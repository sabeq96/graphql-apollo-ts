import * as knexfile from '../knexfile.js';
import * as Knex from 'knex';

const knex = Knex(knexfile.development);

export { knex, Knex as IKnex };
