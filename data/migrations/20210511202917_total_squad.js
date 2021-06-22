exports.up = function (knex) {
  return knex.schema.table('Children', (table) => {
    table.integer('SquadPoints').defaultTo(0);
  });
};
exports.down = function (knex) {
  return knex.schema.table('Children', (table) => {
    table.dropColumn('SquadPoints');
  });
};
