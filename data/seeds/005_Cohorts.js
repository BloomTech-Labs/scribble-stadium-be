const cohort = {
  ID: 1,
  StoryID: 1,
};

exports.seed = function (knex) {
  // Inserts seed entries
  return knex('Cohorts').insert(cohort);
};
