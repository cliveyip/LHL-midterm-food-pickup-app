exports.seed = function(knex, Promise) {
  return knex('carts').del()
    .then(function () {
      return Promise.all([
        knex('carts').insert({
          quantity: "1",
          payment_method:"cash"
        })

      ]);
    });
};
