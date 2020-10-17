// Transaction Function Helpers

/**
 * This function pulls all voting results and uses that data to calculate
 * the winner for each faceoff. It returns an object with the results of
 * each faceoff sorted by FaceoffID.
 * @param {Object} conn a knex client connection
 * @returns {Promise} returns an object with { Points, Winner, SquadID }
 */
const countVotes = async (conn) => {
  // Pull all votes from the database and initialize results object
  const votes = await getVotingResults(conn);
  const res = {};
  // Iterate over all of the votes from the database
  votes.forEach(({ Vote, ID, Points, SquadID }) => {
    // Initialize vote counters for team 1 and 2
    if (!res[ID]) res[ID] = { 1: 0, 2: 0 };
    // Add points value and squad id for the faceoff
    if (!res[ID].Points) res[ID].Points = Points;
    if (!res[ID].SquadID) res[ID].SquadID = SquadID;
    // Increment the vote for the relevant team
    res[ID][Vote]++;
  });
  // Iterate over the voting results and conditionally declare a winner
  for (let f in res) {
    if (res[f][1] > res[f][2]) res[f].Winner = 1;
    else if (res[f][1] < res[f][2]) res[f].Winner = 2;
    else res[f].Winner = 0;
  }
  return res;
};

/**
 * Updates the Faceoffs table in the database with the winner of
 * the matchup and then tallies up points for each team in a squad
 * based on the children's votes.
 * @param {Object} conn a knex client object
 * @param {Object} results object returned from countVotes()
 * @returns {Object} returns an object of team point totals by squad\
 *                   { [SquadID]: { 1: int, 2: int } }
 */
const updateFaceoffs = async (conn, results) => {
  // initialize response object
  const squadTotals = {};
  // Iterate over voting results
  for (let FaceoffID in results) {
    const { Winner, SquadID, Points } = results[FaceoffID];
    // Update the faceoffs table with the results of each matchup
    await updateFaceoffWinner(conn, FaceoffID, Winner);

    // Initialize a value in the response object to count points
    if (!squadTotals[SquadID]) squadTotals[SquadID] = { 1: 0, 2: 0 };
    // Assign points based on the winner of each faceoff
    if (Winner === 0) {
      squadTotals[SquadID][1] += Points / 2;
      squadTotals[SquadID][2] += Points / 2;
    } else squadTotals[SquadID][Winner] += Points;
  }
  return squadTotals;
};

/**
 * This function does some final state updates in the database, taking
 * the results from the previous function and using it to update the
 * winning team in the Squads table as well as the points that each team
 * was awarded based on the votes.
 * @param {Object} conn a knex client object
 * @param {Object} squadTotals object returned from updateFaceoffs()
 */
const updateTeamsAndSquads = async (conn, squadTotals) => {
  // Iterate over the totals
  for (let SquadID in squadTotals) {
    // Initialize the winning team to 0 for a tie
    let winningTeam = 0;

    // Destructure the points for team 1 as p1 and for team 2 as p2
    const { 1: p1, 2: p2 } = squadTotals[SquadID];
    // If the result was not a tie, update the winningTeam
    if (p1 > p2) winningTeam = 1;
    if (p1 < p2) winningTeam = 2;

    // Update relevant database tables for the squad and both teams
    await updatePointsForTeam(conn, SquadID, 1, p1);
    await updatePointsForTeam(conn, SquadID, 2, p2);
    await updateWinningTeamInSquad(conn, SquadID, winningTeam);
  }
};

// Database Queries

/**
 * Queries database for  the results of all child-submitted votes
 * @param {Object} conn a knex client object
 * @returns {Promise} returns a promise that resolves to array of objects with:\
 *                    { Vote, ID, Points, SquadID }
 */
const getVotingResults = (conn) => {
  return conn('Votes AS V')
    .join('Faceoffs AS F', 'F.ID', 'V.FaceoffID')
    .select(['Vote', 'F.ID', 'Points', 'SquadID'])
    .orderBy('ID');
};

/**
 * Updated the requested faceoff with the winner, representing whichever
 * submission got the most votes
 * @param {Object} conn a knex client connection
 * @param {number} ID the unique integer ID of the faceoff
 * @param {number} Winner a number, must be in [0, 1, 2]
 * @returns {Promise}
 */
const updateFaceoffWinner = (conn, ID, Winner) => {
  return conn('Faceoffs').update({ Winner }).where({ ID });
};

/**
 * This function selects a team from the database based on the squad id and
 * the team number and then updates that team's database row to reflect the
 * amount of points they earned that week.
 * @param {Object} conn a knex client connection
 * @param {number} ID the unique integer ID of the squad
 * @param {number} Num the team number, either 1 or 2
 * @param {number} Points the number of points earned by the team
 * @returns {Promise}
 */
const updatePointsForTeam = (conn, ID, Num, Points) => {
  return conn('Teams AS T')
    .join('Squads AS S', 'S.ID', 'T.SquadID')
    .where('S.ID', ID)
    .andWhere('T.Num', Num)
    .select('T.ID AS TeamID')
    .first()
    .then(({ TeamID }) =>
      // after finding the ID, return a promise that updates that teams's points
      conn('Teams')
        .where({ ID: TeamID })
        .update({ Points: Math.round(Points) })
    );
};

/**
 * This updates the winner in the Squad table to be either team1, 2, or 0 for a tie
 * @param {Object} conn a knex client connection
 * @param {number} ID the unique integer ID of the squad
 * @param {number} Winner the winning team number [1, 2] or 0 for a tie
 * @returns {Promise}
 */
const updateWinningTeamInSquad = (conn, ID, Winner) => {
  return conn('Squads').where({ ID }).update({ Winner });
};

module.exports = {
  countVotes,
  updateFaceoffs,
  updateTeamsAndSquads,
};
