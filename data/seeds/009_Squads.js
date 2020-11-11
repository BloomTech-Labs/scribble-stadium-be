const squads = [...new Array(4)].map((i, idx) => ({
  CohortID: 1,
  Winner: null
}));

exports.seed = function(knex) {
  // Inserts seed entries
  return knex('Squads').insert(squads);
};
