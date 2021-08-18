export function up(knex) {
    return knex.schema
        .createTable('Singleplayer', (singleplayer) => {
            singleplayer.increments('ID');
            singleplayer.string('Botname').notNullable();
            singleplayer.string('Stories').notNullable();
        });
}

export function down(knex) {
    return knex.schema.dropTableIfExists('Singleplayer');
}