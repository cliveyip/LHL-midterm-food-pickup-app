exports.seed = function(knex, Promise) {
  return knex('dishes').del()
    .then(function () {
      return Promise.all([
        knex('dishes').insert({
        id:1, restaurant_id:1, name:"Chips", price:"4.99",
          category:"app"
        }).then(()=> {
          return knex.insert({})
        }),
         knex('dishes').insert({
          id:2, restaurant_id:1, name:"Cheeseburger", price:"12.99",
          category:"main"
        }),
         knex('dishes').insert({
          id:3, restaurant_id:1, name:"Coke", price:"1.00",
          category:"drink"
        }),
         knex('dishes').insert({
          id:4, restaurant_id:1, name:"Chocolate Cake", price:"3.99",
          category:"deserets"
        })

      ]);
    });
};
