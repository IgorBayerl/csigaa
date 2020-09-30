
exports.up = function(knex) {
    return knex.schema.createTable('studants', function (table) {
    table.increments()

    table.string('accessKey').notNullable();
    table.string('name').notNullable();
    table.string('password').notNullable();
    
    table.string('info').notNullable();
    
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('studants')
};
