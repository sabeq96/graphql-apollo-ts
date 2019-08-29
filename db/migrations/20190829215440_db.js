exports.up = function(knex) {
  return knex.schema.dropTableIfExists('users').createTable('users', (table) => {
    table.increments('id');
    table.string('first_name');
    table.string('last_name');
    table.string('email').unique();
    table.string('password');
    table.string('avatar');
    table.boolean('is_payed_user');
    table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
    table.dateTime('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users')
};
