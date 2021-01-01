
exports.up = function(knex) {
    return knex.schema.createTable('users', function (table) {

    table.increments()
    table.string('userName').notNullable();
    table.string('userPassword').notNullable();
    table.string('degree').notNullable();
    table.string('expoToken');
    table.bool('notifications')
    table.string('info');
    
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users')
};


