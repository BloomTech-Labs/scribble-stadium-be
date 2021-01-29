
exports.up = function(knex) {
    return knex.schema.createTable('Achievements', table=>{
        table.string('Name').unsigned();
        table.string('Description').unsigned()
    })
};

exports.down = function(knex) {
  
};
