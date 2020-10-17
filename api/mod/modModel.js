const db = require('../../data/db-config');
const { dbOps, formatCohortSubmissions } = require('../../lib');
const faceoff = require('./faceoffGeneration');

/**
 * Queries the database for a list of all current cohorts
 * @returns {Promise} returns a promise that resolves to a list of cohort objects
 */
const getCohorts = () => {
  return db('Cohorts');
};

/**
 * Attempts to add another cohort to the database
 * @param {Object} cohort a cohort object (or array of cohorts) to be added
 * @param {number} cohort.StoryID the id of the cohort's curernt story
 * @return {Promise} returns a promise that resolves to the ID(s) of the new cohort(s)
 */
const addCohort = (cohort) => {
  return db('Cohorts').insert(cohort).returning('ID');
};

/**
 * Returns a hash table list of all submissions for a given cohort. Response documentation
 * can be found on the GET /mod/submissions?cohortId={} endpoint.
 * @param {number} CohortID the id of the desired cohort
 * @returns {Promise} a promise that resolves to a table of submissions
 */
const getSubmissionsByCohort = async (CohortID) => {
  const data = await dbOps.getAllSubmissionsByCohort(db, CohortID);
  return formatCohortSubmissions(data);
};

/**
 * Attempts to update the submission status of a given post.
 * @param {number} ID the id of the submission to update
 * @param {Object} changes the desired changes for the given submission
 * @param {string} changes.Status a string containing one of the following flags: 'APPROVED', 'REJECTED'
 * @returns {Promise} returns a promise that resolves to a count of updated rows
 */
const moderatePost = (ID, changes) => {
  return db('Submissions').where({ ID }).update(changes);
};

const generateFaceoffs = () => {
  return db.transaction(async (trx) => {
    try {
      const data = await faceoff.getSubmissionsWithPointSums(trx);
      const formattedData = faceoff.formatPointSums(data);
      const squads = faceoff.sortBySquad(Object.values(formattedData));
      const matchups = faceoff.groupOnPoints(squads);

      const IDs = await trx('Faceoffs').insert(matchups).returning('ID');

      return IDs;
    } catch (err) {
      console.log({ err: err.message });
      trx.rollback();
    }
  });
};

const calculateResultsForTheWeek = () => {
  return db.transaction(async (trx) => {
    try {
      const data = await getVotingResults(trx);
      const results = countVotes(data);

      console.log({ results });

      const squadUpdates = {};

      for (let FaceoffID in results) {
        const { Winner, SquadID, Points } = results[FaceoffID];
        await updateFaceoffWinner(trx, FaceoffID, Winner);

        if (!squadUpdates[SquadID]) squadUpdates[SquadID] = { 1: 0, 2: 0 };
        if (Winner === 0) {
          squadUpdates[SquadID][1] += Points / 2;
          squadUpdates[SquadID][2] += Points / 2;
        } else squadUpdates[SquadID][Winner] += Points;
      }

      // console.log({ squadUpdates });

      // now we iterate over the squad scores?
      for (let SquadID in squadUpdates) {
        let winningTeam = 0;
        const { 1: p1, 2: p2 } = squadUpdates[SquadID];
        if (p1 > p2) winningTeam = 1;
        if (p1 < p2) winningTeam = 2;
        await updatePointsForTeam(trx, SquadID, 1, p1);
        await updatePointsForTeam(trx, SquadID, 2, p2);
        await updateWinningTeamInSquad(trx, SquadID, winningTeam);
      }

      const z = await trx('Squads AS S').join(
        'Teams AS T',
        'S.ID',
        'T.SquadID'
      );

      console.log(z);
    } catch (err) {
      console.log({ err: err.message });
      trx.rollback();
    }
  });
};

const getVotingResults = (conn) => {
  return conn('Votes AS V')
    .join('Faceoffs AS F', 'F.ID', 'V.FaceoffID')
    .select(['Vote', 'F.ID', 'Points', 'SquadID'])
    .orderBy('ID');
};

const countVotes = (votes) => {
  const res = {};
  votes.forEach(({ Vote, ID, Points, SquadID }) => {
    if (!res[ID]) res[ID] = { 1: 0, 2: 0 };
    if (!res[ID].Points) res[ID].Points = Points;
    if (!res[ID].SquadID) res[ID].SquadID = SquadID;
    res[ID][Vote]++;
  });
  for (let f in res) {
    if (res[f][1] > res[f][2]) res[f].Winner = 1;
    else if (res[f][1] < res[f][2]) res[f].Winner = 2;
    else res[f].Winner = 0;
  }
  return res;
};

const updateFaceoffWinner = (conn, ID, Winner) => {
  return conn('Faceoffs').update({ Winner }).where({ ID });
};

const updatePointsForTeam = (conn, ID, Num, Points) => {
  return conn('Teams AS T')
    .join('Squads AS S', 'S.ID', 'T.SquadID')
    .where('S.ID', ID)
    .andWhere('T.Num', Num)
    .select('T.ID AS TeamID')
    .first()
    .then(({ TeamID }) =>
      conn('Teams')
        .where({ ID: TeamID })
        .update({ Points: Math.round(Points) })
    );
};

const updateWinningTeamInSquad = (conn, ID, Winner) => {
  return conn('Squads').where({ ID }).update({ Winner });
};

module.exports = {
  getCohorts,
  addCohort,
  getSubmissionsByCohort,
  moderatePost,
  generateFaceoffs,
  calculateResultsForTheWeek,
};
