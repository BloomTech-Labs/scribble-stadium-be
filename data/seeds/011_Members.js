const members = [...new Array(16)].map((i, idx) => ({
  TeamID: `${Math.floor((idx + 2) / 2)}`,
  SubmissionID: `${idx + 1}`
}));

exports.seed = function(knex) {
  // Inserts seed entries
  return knex('Members').insert(members);
};