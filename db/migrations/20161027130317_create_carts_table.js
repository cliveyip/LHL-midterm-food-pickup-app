exports.up = function(knex, Promise) {
  return knex.schema.createTable('carts', function (table) {
    table.increments();
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('id').inTable('users');
     table.integer('dish_id').unsigned();
    table.foreign('dish_id').references('id').inTable('dishes');
    table.string('quantity');
    table.string('payment_method');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('carts');
};
