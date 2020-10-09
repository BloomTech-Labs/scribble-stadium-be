exports.up = function (knex) {
  return knex.schema.createTable('Flags', (t) => {
    t.increments('ID');
    t.integer('SubmissionID')
      .notNullable()
      .unsigned()
      .references('Submissions.ID')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    t.boolean('Inappropriate');
    t.boolean('Sensitive');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('Flags');
};
