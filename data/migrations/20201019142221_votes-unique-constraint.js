exports.up = function (knex) {
  return knex.schema.table('Votes', (t) => {
    t.unique(['MemberID', 'FaceoffID']);
  });
};

exports.down = function (knex) {
  return knex.schema.table('Votes', (t) => {
    t.dropUnique(['MemberID', 'FaceoffID']);
  });
};
