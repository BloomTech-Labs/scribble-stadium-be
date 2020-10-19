const { dbOps, formatSubForMatchups } = require('../../../lib');

/**
 * This function queries the database for a list of Submission IDs for a given squad's faceoffs.
 * @param {Object} conn knex client connection
 * @param {number} SquadID unique integer squad id
 */
const getSubIdsForFaceoffs = (conn, SquadID) => {
  return conn('Faceoffs AS F')
    .join('Squads AS S', 'S.ID', 'F.SquadID')
    .where('S.ID', SquadID)
    .select('F.*');
};

/**
 * This function adds submission data to the faceoffs based on the ids returned from the
 * getSubIdsForFaceoffs() function above.
 * @param {Object} conn a knex client object
 * @param {Object} faceoffs an object containing faceoffs
 */
const addSubmissionsToFaceoffs = async (conn, faceoffs) => {
  for (let f in faceoffs) {
    const s1 = await dbOps.getSubByID(conn, faceoffs[f].SubmissionID1);
    const s2 = await dbOps.getSubByID(conn, faceoffs[f].SubmissionID2);
    faceoffs[f].Submission1 = formatSubForMatchups(s1);
    faceoffs[f].Submission2 = formatSubForMatchups(s2);
  }
};

module.exports = {
  getSubIdsForFaceoffs,
  addSubmissionsToFaceoffs,
};
