
exports.up = function(knex) {
    return knex.schema
        .createTable('Virtual-Players', function (table) {
        table.increments('ID');

        table.integer('AvatarID')
        .notNullable()
        .unsigned()
        .references('Avatars.ID')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
        
        table.string('CharacterName');
        });
    };

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('Avatars')
    .dropTableIfExists('Virtual-Players');
};
