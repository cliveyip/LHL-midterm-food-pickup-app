exports.seed = function(knex, Promise) {
  return knex('carts').del()
    .then(function () {
      return Promise.all([
        knex('carts').insert({
          id:1,
          user_id:1,
          dish_id:1,
          quantity: "1",
          payment_method:"cash"
        }),
        knex('carts').insert({
          id:2,
          user_id:1,
          dish_id:2,
          quantity: "2",
          payment_method:"cash"
        }),
        knex('carts').insert({
          id:3,
          user_id:1,
          dish_id:4,
          quantity: "1",
          payment_method:"cash"
        })

      ]);
    });
};
