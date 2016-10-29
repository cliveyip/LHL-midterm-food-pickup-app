exports.up = function(knex, Promise) {
    return knex.schema.table('restaurants', function (table) {
    table.dropColumn('phone_number');
    table.string('phone_numb');
  });

};

exports.down = function(knex, Promise) {
    return knex.schema.table('restaurants');

};
