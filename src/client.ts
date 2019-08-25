import * as Knex from 'knex';
import { Model } from 'objection';

const knexFile = require('../knexfile.js')

export const knex = Knex(knexFile.development)

Model.knex(knex);
