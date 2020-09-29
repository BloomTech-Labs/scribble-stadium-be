exports.up = function (knex) {
  return knex.schema
    .createTable('Submissions', (t) => {
      t.increments('ID');
      t.integer('ChildID')
        .notNullable()
        .unsigned()
        .references('Children.ID')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
      t.integer('StoryID')
        .notNullable()
        .unsigned()
        .references('Stories.ID')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
      t.boolean('HasRead').defaultTo(false);
      t.boolean('HasWritten').defaultTo(false);
      t.boolean('HasDrawn').defaultTo(false);
      t.integer('Complexity');
      t.unique(['ChildID', 'StoryID']);
    })
    .createTable('Writing', (t) => {
      t.increments('ID');
      t.string('URL').notNullable().unique();
      t.integer('PageNum').notNullable();
      t.integer('SubmissionID')
        .notNullable()
        .unsigned()
        .references('Submissions.ID')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
      t.unique(['PageNum', 'SubmissionID']);
    })
    .createTable('Drawing', (t) => {
      t.increments('ID');
      t.string('URL').notNullable().unique();
      t.integer('SubmissionID')
        .notNullable()
        .unsigned()
        .unique()
        .references('Submissions.ID')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('Drawing')
    .dropTableIfExists('Writing')
    .dropTableIfExists('Submissions');
};
