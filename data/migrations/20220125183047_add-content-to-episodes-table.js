exports.up = function (knex) {
  return knex.schema.table('Episodes', (table) => {
    table.text('Content').defaultTo(null);
  });
};

exports.down = function (knex) {
  return knex.schema.table('Episodes', (table) => {
    table.dropColumn('Content');
  });
};
