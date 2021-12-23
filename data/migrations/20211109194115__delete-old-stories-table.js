exports.up = function (knex) {
  return knex.schema
    .alterTable('Submissions', (t) => {
      t.dropForeign('StoryID');
    })
    .alterTable('Cohorts', (t) => {
      t.dropForeign('StoryID');
    })
    .dropTableIfExists('Stories', () => {})
    .renameTable('Stories-New', 'Stories');
};

exports.down = function (knex) {
  return knex.schema
    .renameTable('Stories', 'Stories-New')
    .createTable('Stories', (t) => {
      t.increments('ID');
      t.string('Title').notNullable();
      t.string('URL').notNullable();
      t.string('WritingPrompt').notNullable();
      t.string('DrawingPrompt').notNullable();
      t.string('Audiofile').nullable();
    })
    .alterTable('Submissions', (t) => {
      t.foreign('StoryID').references('Stories.ID');
    })
    .alterTable('Cohorts', (t) => {
      t.foreign('StoryID').references('Stories.ID');
    });
};
