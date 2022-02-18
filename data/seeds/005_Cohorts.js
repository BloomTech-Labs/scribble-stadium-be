// note: cohorts that started earlier are further along in the story. Cohorts don't have to start every week, so there was a gap week between cohort2 & cohort3 in the example below.
const cohorts = [
  {
    ID: 1,
    StoryID: 5,
  },
  {
    ID: 2,
    StoryID: 4,
  },
  {
    ID: 3,
    StoryID: 2,
  },
  {
    ID: 4,
    StoryID: 1,
  },
];

exports.seed = function (knex) {
  // Inserts seed entries
  return knex('Cohorts').insert(cohorts);
};
