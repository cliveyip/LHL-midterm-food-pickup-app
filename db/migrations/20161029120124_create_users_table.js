
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function (table) {
      table.increments();
      table.string('description');
      table.date('date_achieved');
    }),
  ]);
};

exports.down = function(knex, Promise) {

};
