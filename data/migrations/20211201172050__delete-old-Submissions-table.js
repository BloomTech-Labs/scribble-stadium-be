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
    .dropTableIfExists('Submissions', () => {});
};

exports.down = function () {
  // This is a destructive migration that cannot be rolled back.
};
