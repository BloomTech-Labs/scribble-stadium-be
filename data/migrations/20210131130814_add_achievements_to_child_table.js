exports.up = function (knex) {
  return knex.schema.table('Children', (table) => {
    table
      .specificType('Achievements', 'integer ARRAY')
      .defaultTo(knex.raw('ARRAY[]::integer[]'));
  });
};

exports.down = function (knex) {
  return knex.schema.table('Children', (table) => {
    table.dropColumn('Achievements');
  });
};
