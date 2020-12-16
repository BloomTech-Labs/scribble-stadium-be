
exports.up = function(knex) {
    return knex.schema.table('Faceoffs', table => {
        table.timestamp('Date').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
    return knex.schema.table('Faceoffs', table => {
        table.dropColumn('Date');
    });
};
