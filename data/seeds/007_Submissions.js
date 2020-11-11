const fake = require('faker');

const submissions = [...new Array(16)].map((i, idx) => ({
  ChildID: `${idx + 1}`,
  StoryID: 1,
  HasRead: true,
  HasWritten: true,
  HasDrawn: true,
  Complexity: 30,
  LowConfidence: false,
  Status: 'APPROVED'
}));

exports.seed = function(knex) {
  // Inserts seed entries
  return knex('Submissions').insert(submissions);
};
