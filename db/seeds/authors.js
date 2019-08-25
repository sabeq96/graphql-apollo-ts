
exports.seed = function(knex) {
  return knex('authors').del()
    .then(function () {
      return knex('authors').insert([
        {id: 1, name: 'Adrian'},
        {id: 2, name: 'Michael'},
        {id: 3, name: 'Peter'}
      ]);
    });
};
