exports.up = function (knex) {
  return knex.schema.createTable('Points', (t) => {
    t.increments('ID');
    t.integer('WritingPoints');
    t.integer('DrawingPoints');
    t.integer('MemberID')
      .notNullable()
      .unsigned()
      .references('Members.ID')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');
    t.integer('SubmissionID')
      .notNullable()
      .unsigned()
      .references('Submissions.ID')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');
    t.unique(['MemberID', 'SubmissionID']);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('Points');
};
