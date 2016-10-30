exports.seed = function(knex, Promise) {
  return knex('owners').del()
    .then(function () {
      return Promise.all([
        knex('owners').insert({
          username:"Joe123", password:"123",
          email:"Joe@gmail.com"
        })

      ]);
    });
};
