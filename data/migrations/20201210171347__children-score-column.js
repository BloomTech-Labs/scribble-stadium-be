exports.up = function (knex) {
    return knex.schema.table('Children', table => {
        table.integer('Total_Points').defaultTo(0).notNullable()
    });
};

exports.down = function (knex) {
    return knex.schema.table('Children', table => {
        table.dropColumn('Total_Points')
    });
};