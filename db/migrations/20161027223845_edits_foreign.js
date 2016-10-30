
exports.up = function(knex, Promise) {
    return knex.schema.table('dishes',  (table) => {
    table.dropColumn('restaurant_id');})
    .then((table)=>{
      return knex.schema.table('dishes',(table)=> {
        table.integer('restaurant_id');
      }).then((table)=>{
      return knex.schema.table('carts',  (table) => {
    table.dropColumn('user_id');
    table.dropColumn('dish_id');})

    .then((table)=>{
      return knex.schema.table('carts',(table) =>{
        table.integer('user_id');
        table.integer('dish_id');
      });


       });

    });
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('dishes')
    .then(()=>{knex.schema.table('carts');});

};

