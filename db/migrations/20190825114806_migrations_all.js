
exports.up = function(knex) {
  return knex.schema
    .createTable('authors', (table) => {
      table.increments('id').unsigned().primary();
      table.string('name').notNull();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .createTable('comments', (table) => {
      table.increments('id').unsigned().primary();
      table.string('text').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      table.integer('author_id')
        .unsigned()
        .notNull()
        .references('id')
        .inTable('authors');
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('authors')
    .dropTable('comments')
};
