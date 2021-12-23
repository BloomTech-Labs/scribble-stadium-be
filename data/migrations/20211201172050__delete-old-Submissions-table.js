exports.up = function (knex) {
  return knex.schema
    .alterTable('Writing', (t) => {
      t.dropForeign('SubmissionID');
    })
    .alterTable('Drawing', (t) => {
      t.dropForeign('SubmissionID');
    })
    .alterTable('Flags', (t) => {
      t.dropForeign('SubmissionID');
    })
    .alterTable('Members', (t) => {
      t.dropForeign('SubmissionID');
    })
    .alterTable('Points', (t) => {
      t.dropForeign('SubmissionID');
    })
    .alterTable('Faceoffs', (t) => {
      t.dropForeign('SubmissionID1');
    })
    .alterTable('Faceoffs', (t) => {
      t.dropForeign('SubmissionID2');
    })
    .dropTableIfExists('Submissions', () => {})
    .renameTable('Submissions-New', 'Submissions');
};

exports.down = function () {
  exports.down = function (knex) {
    return knex.schema
      .renameTable('Submissions', 'Submissions-New')
      .createTable('Submissions', (t) => {
        t.increments('ID');
        t.integer('ChildID')
          .notNullable()
          .unsigned()
          .references('Children.ID')
          .onUpdate('CASCADE')
          .onDelete('RESTRICT');
        t.integer('StoryID').notNullable().unsigned();
        t.boolean('HasRead').defaultTo(false);
        t.boolean('HasWritten').defaultTo(false);
        t.boolean('HasDrawn').defaultTo(false);
        t.integer('Complexity');
        t.boolean('LowConfidence');

        t.enu('Status', null, {
          enumName: 'status',
          existingType: true,
          useNative: true,
        }).defaultsTo('CLEAR');
        t.integer('CohortID').notNullable().unsigned().defaultsTo(1);
        t.unique(['ChildID', 'StoryID', 'CohortID']);
      })

      .alterTable('Writing', (t) => {
        t.foreign('SubmissionID').references('Submissions.ID');
      })
      .alterTable('Drawing', (t) => {
        t.foreign('SubmissionID').references('Submissions.ID');
      })
      .alterTable('Flags', (t) => {
        t.foreign('SubmissionID').references('Submissions.ID');
      })
      .alterTable('Members', (t) => {
        t.foreign('SubmissionID').references('Submissions.ID');
      })
      .alterTable('Points', (t) => {
        t.foreign('SubmissionID').references('Submissions.ID');
      })
      .alterTable('Faceoffs', (t) => {
        t.foreign('SubmissionID1').references('Submissions.ID');
        t.foreign('SubmissionID2').references('Submissions.ID');
      });
  };
};
