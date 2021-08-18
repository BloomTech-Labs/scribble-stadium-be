exports.up = function(knex) {
    return knex.schema
        .createTable('Singleplayer', (singleplayer) => {
            singleplayer.increments('ID');
            singleplayer.string('Botname').notNullable();
            singleplayer.string('Stories').notNullable();
        });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('Singleplayer');
};