exports.up = function (knex) {
  return knex.schema
    .alterTable('Submissions', (t) => {
      t.dropForeign('StoryID');
    })
    .alterTable('Cohorts', (t) => {
      t.dropForeign('StoryID');
    })
    .dropTableIfExists('Stories', () => {});
};

exports.down = function () {
  // This is a destructive migration that cannot be rolled back.
};
