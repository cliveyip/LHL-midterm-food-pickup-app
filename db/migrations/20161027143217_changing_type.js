exports.up = function(knex, Promise) {
    return knex.schema.table('users', function (table) {
    table.dropColumn('phone_num');
    table.string('phone_numb');
  });

};

exports.down = function(knex, Promise) {
    return knex.schema.table('users');

};
