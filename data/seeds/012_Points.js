const points = [...new Array(8)].map((i, idx) => ({
  WritingPoints: 30,
  DrawingPoints: 20,
  MemberID: `${Math.floor((idx + 2) / 2)}`,
  SubmissionID: `${idx + 1}`,
}));

exports.seed = function (knex) {
  // Inserts seed entries
  return knex('Points').insert(points);
};
