exports.up = function (knex) {
  return knex.schema.table('Children', (table) => {
    table.string('Email', 256).notNullable().unique();
    table.string('CharacterName', 256).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.table('Children', (table) => {
    table.dropColumn('Email');
    table.dropColumn('CharacterName');
  });
};
