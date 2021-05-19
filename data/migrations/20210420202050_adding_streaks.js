exports.up = function (knex) {
  return knex.schema.table('Children', (table) => {
    table.integer('Streaks').defaultTo(0).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.table('Children', (table) => {
    table.dropColumn('Streaks');
  });
};
