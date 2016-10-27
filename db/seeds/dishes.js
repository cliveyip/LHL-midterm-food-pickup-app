exports.seed = function(knex, Promise) {
  return knex('dishes').del()
    .then(function () {
      return Promise.all([
        knex('dishes').insert({
          name:"Chicken Wings", price:"9.99",
          category:"App"
        })

      ]);
    });
};
