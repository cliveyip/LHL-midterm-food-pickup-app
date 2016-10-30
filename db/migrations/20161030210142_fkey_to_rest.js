
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('restaurants', function(table){
      table.integer('owner_id').references('id').inTable('owners');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('restaurants', function(table){
      table.dropColumn('owner_id');
    })
  ])
};
