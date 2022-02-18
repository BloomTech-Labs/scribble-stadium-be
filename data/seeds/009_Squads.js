const squads = [
  { CohortID: 1, Winner: null },
  { CohortID: 1, Winner: null },
];

exports.seed = function (knex) {
  // Inserts seed entries
  return knex('Squads').insert(squads);
};
