const db = require('../../../data/db-config');
const { dsApi, dbOps, formatCohortSubmissions } = require('../../../lib');

/**
 * This function runs a series of transactional requests to:
 *   1. pull and format submission data from our database
 *   2. send the formatted data to the DSAPI for clustering
 *   3. store the generated "squads" in our databse and put the members into teams
 * @returns {Object} returns an object containing the new clusters (not needed)
 */
const clusterGeneration = () => {
  return db.transaction(async (trx) => {
    try {
      const data = {};
      // Pull a list of all cohorts
      const cohorts = await trx('Cohorts');
      // Iterate over the cohorts
      for (let { ID } of cohorts) {
        // Get all submissions for every cohort
        const unformatted = await dbOps.getAllSubmissionsByCohort(trx, ID);
        // Store each cohorts' submissions in the data hash table with the key being the cohort id
        data[ID] = formatCohortSubmissions(unformatted);
      }
      // Send the submissions to data science for clustering
      const clusters = await dsApi.getClusters(data);

      // Add the generated clusters to the database
      let members = [];
      // Iterate over cohorts again
      for (let { ID } of cohorts) {
        // For every squad returned in each cohort from data science, where squad is an array of 4 submission IDs
        for (let squad of clusters[ID]) {
          // Create a squad in the database for the current cohort
          const [SquadID] = await addSquad(trx, ID);
          // Create two teams for the newly created squad
          const [t1, t2] = await addTeams(trx, SquadID);
          // Create 4 new team member entries for the database
          const newMembers = await addMembers(trx, t1, t2, squad);
          // [[1], [2], [3], [4]] => [1, 2, 3, 4]
          members.push([].concat.apply([], newMembers));
        }
      }

      // This line flattens the array of arrays so that this function
      // returns a simple 1D array of integers
      return members;
    } catch (err) {
      throw new Error(err.message);
    }
  });
};

// Helper functions for storing clusters in the database

/**
 * Adds a new cluster (squad) to the database for foreign key references.
 * @param {Object} conn a knex client instance
 * @param {number} CohortID the integer representation of the cohort
 * @returns {Promise} returns a promise resolving to an array with the newly generated squad ID inside
 */
const addSquad = (conn, CohortID) => {
  return conn('Squads').insert({ CohortID }).returning('ID');
};

/**
 * Adds two new teams to the database for the same squad
 * @param {Object} conn a knex client instance
 * @param {number} SquadID the integer representation of the squad
 * @param {string} team1Name name of the given team (defaults to "Team #")
 * @param {string} team2Name name of the given team (defaults to "Team #")
 * @returns {Promise} returns a promise resolving to an array with the two new team IDs inside
 */
const addTeams = (
  conn,
  SquadID,
  team1Name = 'Team 1',
  team2Name = 'Team 2'
) => {
  return conn('Teams')
    .insert([
      { SquadID, Name: team1Name, Num: 1 },
      { SquadID, Name: team2Name, Num: 2 },
    ])
    .returning('ID');
};

/**
 * Adds a group of team members to the database
 * @param {Object} conn a knex client instance
 * @param {number} team1ID the integer representation of the first team
 * @param {number} team2ID the integer representation of the second team
 * @param {Array} subIDs an array of 4 IDs, each pointing to the submissions for the given team
 * @returns {Promise} returns a promise resolving to an array containing all of the new members' IDs
 */
const addMembers = (conn, team1ID, team2ID, subIDs) => {
  return Promise.all(
    subIDs.map((id, i) => addSingleMember(conn, id, i < 2 ? team1ID : team2ID))
  );
};

/**
 * Adds a new team member to the database, should only be called by addMembers()
 * @param {Object} conn a knex client instance
 * @param {number} SubmissionID the integer representation of the submission
 * @param {number} TeamID the integer representation of the team
 * @returns {Promise} returns a promise resolving to an array with the new member's ID in it
 */
const addSingleMember = (conn, SubmissionID, TeamID) => {
  return conn('Members').insert({ SubmissionID, TeamID }).returning('ID');
};

module.exports = clusterGeneration;
