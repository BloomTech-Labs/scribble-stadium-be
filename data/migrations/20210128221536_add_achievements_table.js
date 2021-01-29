
exports.up = function(knex) {
    return knex.schema.createTable('Achievements', table=>{
        table.increments('ID');
        table.string('Name').unsigned();
        table.string('Description').unsigned()
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('Achievements')
};
