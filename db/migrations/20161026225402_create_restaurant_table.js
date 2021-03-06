exports.up = function(knex, Promise) {
  return knex.schema.createTable('restaurants', function (table) {
    table.increments();
    table.string('name');
    table.integer('phone_number');
    table.string('address');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('restaurants');
};
