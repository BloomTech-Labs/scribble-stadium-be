const db = require('../../data/db-config');
const { dsApi, dbOps, formatCohortSubmissions } = require('../../lib');

/**
 * Attempts to update the complexity score of a submission.
 * @param {number} ID the id of the submission to update
 * @param {number} Complexity an integer representation of the complexity of a written story
 * @returns {Promise} returns a promise that resolves to the number of rows updated
 */
const setComplexity = (ID, Complexity) => {
  return db('Submissions').where({ ID }).update({ Complexity });
};

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
      const cohorts = await trx('Cohorts');
      for (let { ID } of cohorts) {
        const unformatted = await dbOps.getAllSubmissionsByCohort(trx, ID);
        data[ID] = formatCohortSubmissions(unformatted);
      }
      const clusters = await dsApi.getClusters(data);

      // Add the generated clusters to the database
      let members;
      for (let { ID } of cohorts) {
        for (let squad of clusters[ID]) {
          const [SquadID] = await addSquad(trx, ID);
          const [t1, t2] = await addTeams(trx, SquadID);
          members = await addMembers(trx, t1, t2, squad);
        }
      }

      // This line flattens the array of arrays so that this function
      // returns a simple 1D array of integers
      return [].concat.apply([], members);
    } catch (err) {
      trx.rollback();
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

module.exports = {
  setComplexity,
  clusterGeneration,
};
