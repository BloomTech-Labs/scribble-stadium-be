const points = [...new Array(16)].map((i, idx) => ({
  WritingPoints: Math.floor(Math.random() * 100),
  DrawingPoints: Math.floor(Math.random() * 100),
  MemberID: `${Math.floor((idx + 2) / 2)}`,
  SubmissionID: `${idx + 1}`
}));

exports.seed = function(knex) {
  // Inserts seed entries
  return knex('Points').insert(points);
};
