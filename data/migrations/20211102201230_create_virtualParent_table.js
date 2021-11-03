
exports.up = function(knex) {
    return knex.schema.createTable('VirtualParent',function(table){
        table.increments();
        table.string('email').notNullable();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
    })
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('VirtualParent')
  
};
