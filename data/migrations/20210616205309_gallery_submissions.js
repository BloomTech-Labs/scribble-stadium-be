exports.up = function (knex) {
  return knex.schema.createTable('Gallery_Submissions', (table) => {
    table.increments('children_submissions_id');
    table.timestamps(true, false);
    table.integer('sprint').notNullable();
    table
      .integer('children_id')
      .references('children_id')
      .inTable('Gallary')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table
      .integer('submissions_id')
      .references('ID')
      .inTable('Submissions')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('Gallery_Submissions');
};
