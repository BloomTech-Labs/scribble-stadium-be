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

const clusterGeneration = () => {
  return db.transaction(async (trx) => {
    try {
      const res = {};

      const cohorts = await trx('Cohorts');

      for (let { ID } of cohorts) {
        res[ID] = await Mod.getSubmissionsByCohort(ID);
      }

      const clusters = await dsApi.getClusters(res);

      for (let { ID } of cohorts) {
        for (let squad of clusters[ID]) {
          const [SquadID] = await trx('Squads')
            .insert({ CohortID: ID })
            .returning('ID');

          const [t1, t2] = await trx('Teams')
            .insert([
              { SquadID, Name: 'Team 1' },
              { SquadID, Name: 'Team 2' },
            ])
            .returning('ID');

          const t1mem = await trx('Members')
            .insert(
              squad.slice(0, 2).map((SubmissionID) => ({
                SubmissionID,
                TeamID: t1,
              }))
            )
            .returning('ID');

          const t2mem = await trx('Members')
            .insert(
              squad.slice(2, 4).map((SubmissionID) => ({
                SubmissionID,
                TeamID: t2,
              }))
            )
            .returning('ID');

          console.log({ SquadID, t1, t2, t1mem, t2mem });
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
