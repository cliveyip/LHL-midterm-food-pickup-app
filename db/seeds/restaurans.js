exports.seed = function(knex, Promise) {
  return knex('restaurants').del()
    .then(function () {
      return Promise.all([
        knex('restaurants').insert({
          owner_id:2, name: "Joe's BBQ",
          phone_numb: "5559871234",
          address:"22 Parklane"})
      ]);
    });
};
