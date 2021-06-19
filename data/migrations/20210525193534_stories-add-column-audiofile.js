exports.up = function (knex) {
  return knex.schema.table('Stories', (table) => {
    table.string('Audiofile').nullable();
  });
};

exports.down = function (knex) {
  return knex.schema.table('Stories', (table) => {
    table.dropColumn('Audiofile');
  });
};
