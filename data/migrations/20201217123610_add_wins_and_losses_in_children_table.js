
exports.up = function(knex) {
    return knex.schema.table('Children', table => {
        table.integer('Wins').defaultTo(0).notNullable();
        table.integer('Losses').defaultTo(0).notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.table('Children', table => {
        table.dropColumn('Wins');
        table.dropColumn('Losses');
    });
};
