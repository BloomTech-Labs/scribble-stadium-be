exports.up = function (knex) {
  return knex.schema
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
    .renameTable('Submissions-New', 'Submissions');
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
      t.unique(['ChildID', 'StoryID']);
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
        t.dropUnique(['ChildID', 'StoryID']);
    })
    .then(()=>knex("Submissions-New").select("*"))
    .then((rows)=>knex("Submissions").insert(rows.map(({childId,storyId})=>{
        return {
            ChildID:childId,
            StoryID:storyId,
        }
    })))
    .then(()=>knex.schema
        .alterTable("Writing", t=>{
            t.dropForeign('SubmissionID');
            t.foreign('SubmissionID')
            .references('Submissions.ID');
        })
        .alterTable("Drawing", t=>{
            t.dropForeign('SubmissionID');
            t.foreign('SubmissionID')
            .references('Submissions.ID');
        })
        .alterTable("Flags", t=>{
            t.dropForeign('SubmissionID');
            t.foreign('SubmissionID')
            .references('Submissions.ID');
        })
        .alterTable("Members", t=>{
            t.dropForeign('SubmissionID');
            t.foreign('SubmissionID')
            .references('Submissions.ID');
        })
        .alterTable("Points", t=>{
            t.dropForeign('SubmissionID');
            t.foreign('SubmissionID')
            .references('Submissions.ID');
        })
        .alterTable("Faceoffs", t=>{
            t.dropForeign('SubmissionID1')
            t.foreign('SubmissionID1')
            .references('Submissions.ID');
            
            t.dropForeign('SubmissionID2')
            t.foreign('SubmissionID2')
            .references('Submissions.ID');
        })
    )
};
