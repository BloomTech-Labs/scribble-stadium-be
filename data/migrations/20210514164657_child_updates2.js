exports.up = function (knex) {
    return knex.schema.table('Children', (t) => {
        t.string('Email', 256).notNullable();
        t.string('CharacterName', 256).notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.table('Children', (t) => {
        t.dropColumn('Email');
        t.dropColumn('CharacterName');
    });
};
