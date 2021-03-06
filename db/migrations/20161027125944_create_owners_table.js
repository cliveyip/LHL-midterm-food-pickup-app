exports.up = function(knex, Promise) {
  return knex.schema.createTable('owners', function (table) {
    table.increments();
    table.string('username');
    table.string('password');
    table.string('email');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('owners');
};
