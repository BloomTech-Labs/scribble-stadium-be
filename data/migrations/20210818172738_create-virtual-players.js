
exports.up = function(knex) {
    return knex.schema
        .createTable('Virtual-Players', function (table) {
        table.increments('ID');
        table.string('AvatarURL');
        table.string('CharacterName');
        });
    };

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('Virtual-Players');
};
