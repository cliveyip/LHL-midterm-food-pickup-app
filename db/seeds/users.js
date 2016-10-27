exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({
          id:1,
          name: 'Alex', username:'alex123',
          password:'123', email: 'alex@gmail.com',
          is_owner: false, phone_numb:"5146233943"
        }),
        knex('users').insert({
          id:2, name: 'Joe', username:'Joe123',
          password:'123', email: 'Joe@gmail.com',
           is_owner: true, phone_numb:"5559991010"
        })

      ]);
    });
};
