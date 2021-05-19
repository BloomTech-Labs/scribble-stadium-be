exports.up = function (knex) {
  return knex.schema.alterTable('Children', (table) => {
    table.integer('VotesRemaining').defaultTo(10).notNullable().alter();
  });
};

exports.down = function (knex) {
  return knex.schema.table('Children', (table) => {
    table.dropColumn('VotesRemaining');
  });
};
