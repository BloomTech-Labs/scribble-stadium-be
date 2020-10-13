const db = require('../../data/db-config');
const { dsApi } = require('../../lib');
const Mod = require('../mod/modModel');

/**
 * Attempts to update the complexity score of a submission.
 * @param {number} ID the id of the submission to update
 * @param {number} Complexity an integer representation of the complexity of a written story
 * @returns {Promise} returns a promise that resolves to the number of rows updated
 */
const setComplexity = (ID, Complexity) => {
  return db('Submissions').where({ ID }).update({ Complexity });
};

const addSquad = (conn, CohortID) => {
  return conn('Squads').insert({ CohortID }).returning('ID');
};

const addTeams = (
  conn,
  SquadID,
  team1Name = 'Team 1',
  team2Name = 'Team 2'
) => {
  return conn('Teams')
    .insert([
      { SquadID, Name: team1Name },
      { SquadID, Name: team2Name },
    ])
    .returning('ID');
};

const addSingleMember = (conn, SubmissionID, TeamID) => {
  return conn('Members').insert({ SubmissionID, TeamID }).returning('ID');
};

const addMembers = (conn, team1ID, team2ID, subIDs) => {
  return Promise.all(
    subIDs.map((id, i) => addSingleMember(conn, id, i < 2 ? team1ID : team2ID))
  );
};

const clusterGeneration = () => {
  return db.transaction(async (trx) => {
    try {
      const res = {};
      const cohorts = await trx('Cohorts');
      for (let { ID } of cohorts) {
        res[ID] = await Mod.getSubmissionsByCohort(ID);
      }
      const clusters = await dsApi.getClusters(res);

      // Add the generated clusters to the database
      for (let { ID } of cohorts) {
        for (let squad of clusters[ID]) {
          const [SquadID] = await addSquad(trx, ID);
          const [t1, t2] = await addTeams(trx, SquadID);
          await addMembers(trx, t1, t2, squad);
        }
      }

      return clusters;
    } catch (err) {
      trx.rollback();
    }
  });
};

module.exports = {
  setComplexity,
  clusterGeneration,
};
