const teams = [
  { Num: 1, Name: 'Team 1', SquadID: 1, Points: null },
  { Num: 2, Name: 'Team 2', SquadID: 1, Points: null },
  { Num: 1, Name: 'Team 1', SquadID: 2, Points: null },
  { Num: 2, Name: 'Team 2', SquadID: 2, Points: null },
];

exports.seed = function (knex) {
  // Inserts seed entries
  return knex('Teams').insert(teams);
};
