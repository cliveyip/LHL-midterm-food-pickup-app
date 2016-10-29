
exports.up = function(knex, Promise) {
  return knex.schema.createTable('dishes', function (table) {
    table.increments();
    table.integer('restaurant_id').unsigned();
    table.foreign('restaurant_id').references('id').inTable('restaurants');
    table.string('name');
    table.decimal('price');
    table.string('category');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('dishes');
};
