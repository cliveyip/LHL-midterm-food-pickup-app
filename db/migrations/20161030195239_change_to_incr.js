
exports.up = function(knex, Promise) {

    return knex.schema.dropTable('users')
    .then((table)=>{
       return knex.schema.createTable('users', function (table) {
    table.increments();
    table.string('name');
    table.string('email');
    table.string('password');
    table.string('phone_numb');
    table.boolean('is_owner');
  });
<<<<<<< HEAD
})
=======

    })
>>>>>>> 696f50f1aa365a20672e3e06edfd2bd46e1e18aa


};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');

};
