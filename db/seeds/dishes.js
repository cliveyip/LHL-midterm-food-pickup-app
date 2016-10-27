exports.seed = function(knex, Promise) {
  return knex('dishes').del()
    .then(function () {
      return Promise.all([
        knex('dishes').insert({
          name:"chips", price:"2.99",
          category:"app"
        }),
         knex('dishes').insert({
          name:"CheeseBurger", price:"12.99",
          category:"main"
        }),

      ]);
    });
};
