
exports.seed = function(knex) {
  return knex('comments').del()
    .then(function () {
      return knex('comments').insert([
        {id: 1, text: 'comment 1', author_id: 1},
        {id: 2, text: 'comment 2', author_id: 1},
        {id: 3, text: 'comment 3', author_id: 2}
      ]);
    });
};
