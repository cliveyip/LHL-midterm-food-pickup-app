
exports.up = function(knex, Promise) {
    return knex.schema.table('users', function (table) {
    table.string('username');
    table.string('password');
    table.string('email');
    table.integer('phone_num');
    table.boolean('is_owner');
  });

};

exports.down = function(knex, Promise) {
    return knex.schema.table('users');

};
