exports.up = function (knex) {
  return knex.schema.table('Faceoffs', (table) => {
    table.integer('Winner').defaultTo(null);
  });
};

exports.down = function (knex) {
  return knex.schema.table('Faceoffs', (table) => {
    table.dropColumn('Winner');
  });
};
