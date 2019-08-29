
exports.seed = function(knex) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {
          id: 1,
          first_name: 'Mirosław',
          last_name: 'Ticktack',
          email: 'm@t.com',
          password: '1234',
          avatar: '',
          is_payed_user: false,
        },
        {
          id: 2,
          first_name: 'Boromir',
          last_name: 'Ticktack',
          email: 'b@t.com',
          password: '1234',
          avatar: '',
          is_payed_user: true,
        },
      ]);
    });
};
