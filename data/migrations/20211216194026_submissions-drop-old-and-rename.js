exports.up = function (knex) {
  // Caution: data in the Submissions table will not be transferred to the Submissions-New table due to notNullable constraints on the episodeId and episodeStartDate columns in the Submissions-New table. 
  
  // If SubmissionIDs in the Writing, Drawing, Flags, Points, Members, and FaceOffs tables cannot be found in the Submissions-New table, data will also be deleted during this migration.

  // Similarly, when migrating down, all data in the Writing, Drawing, Flags, Points, Members, and FaceOffs tables are deleted since the "newly" created Submissions table is empty.
  return Promise.resolve()
    .then(()=>knex('Writing')
    .whereNotIn("SubmissionID",knex("Submissions-New")
    .select("id"))
    .delete())
    .then(()=>knex("Drawing")
    .whereNotIn("SubmissionID",knex("Submissions-New")
    .select("id"))
    .delete())
    .then(()=>knex("Flags")
    .whereNotIn("SubmissionID",knex("Submissions-New")
    .select("id"))
    .delete())
    .then(()=>knex("Points")
    .whereNotIn("SubmissionID",knex("Submissions-New")
    .select("id"))
    .delete())
    .then(()=>knex("Members")
    .whereNotIn("SubmissionID",knex("Submissions-New")
    .select("id"))
    .delete())
    .then(()=>knex("Faceoffs")
    .whereNotIn("SubmissionID1",knex("Submissions-New")
    .select("id"))
    .delete())
    .then(()=>knex("Faceoffs")
    .whereNotIn("SubmissionID2",knex("Submissions-New")
    .select("id"))
    .delete())
    .then(()=>knex.schema
      .alterTable('Writing', (t) => {
        t.dropForeign('SubmissionID');
        t.foreign('SubmissionID').references('Submissions-New.id');
      })
      .alterTable('Drawing', (t) => {
        t.dropForeign('SubmissionID');
        t.foreign('SubmissionID').references('Submissions-New.id');
      })
      .alterTable('Flags', (t) => {
        t.dropForeign('SubmissionID');
        t.foreign('SubmissionID').references('Submissions-New.id');
      })
      .alterTable('Members', (t) => {
        t.dropForeign('SubmissionID');
        t.foreign('SubmissionID').references('Submissions-New.id');
      })
      .alterTable('Points', (t) => {
        t.dropForeign('SubmissionID');
        t.foreign('SubmissionID').references('Submissions-New.id');
      })
      .alterTable('Faceoffs', (t) => {
        t.dropForeign('SubmissionID1');
        t.foreign('SubmissionID1').references('Submissions-New.id');
  
        t.dropForeign('SubmissionID2');
        t.foreign('SubmissionID2').references('Submissions-New.id');
      })
      .dropTable('Submissions')
      .renameTable('Submissions-New', 'Submissions')
    )   
};

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
      t.boolean('LowConfidence');

      t.enu('Status', null, {
        enumName: 'status',
        existingType: true,
        useNative: true,
      }).defaultsTo('CLEAR');
      t.integer('CohortID')
        .notNullable()
        .unsigned()
        .references('Cohorts.ID')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT')
        .defaultsTo(1);
      t.unique(['ChildID', 'StoryID', 'CohortID']);
    })

    .then(()=>knex('Writing')
    .delete())
    .then(()=>knex("Drawing")
    .delete())
    .then(()=>knex("Flags")
    .delete())
    .then(()=>knex("Points")
    .delete())
    .then(()=>knex("Members")
    .delete())
    .then(()=>knex("Faceoffs")
    .delete())
    .then(()=>knex("Faceoffs")
    .delete())

    .then(()=>knex.schema
      .alterTable('Writing', (t) => {
        t.dropForeign('SubmissionID');
        t.foreign('SubmissionID').references('Submissions.ID');
      })
      .alterTable('Drawing', (t) => {
        t.dropForeign('SubmissionID');
        t.foreign('SubmissionID').references('Submissions.ID');
      })
      .alterTable('Flags', (t) => {
        t.dropForeign('SubmissionID');
        t.foreign('SubmissionID').references('Submissions.ID');
      })
      .alterTable('Members', (t) => {
        t.dropForeign('SubmissionID');
        t.foreign('SubmissionID').references('Submissions.ID');
      })
      .alterTable('Points', (t) => {
        t.dropForeign('SubmissionID');
        t.foreign('SubmissionID').references('Submissions.ID');
      })
      .alterTable('Faceoffs', (t) => {
        t.dropForeign('SubmissionID1');
        t.foreign('SubmissionID1').references('Submissions.ID');

        t.dropForeign('SubmissionID2');
        t.foreign('SubmissionID2').references('Submissions.ID');
      })
    )
};
