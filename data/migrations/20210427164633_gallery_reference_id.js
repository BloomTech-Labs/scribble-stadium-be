exports.up = function (knex) {
  return knex.schema.table('Gallary', (table) => {
    table
      .integer('submission_id')
      .unsigned()
      .references('ID')
      .inTable('Submissions')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table
      .integer('children_id')
      .unsigned()
      .references('ID')
      .inTable('Children')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.table('Gallary', (table) => {
    table.dropColumn('children_id');
    table.dropColumn('submission_id');
  });
};
