const { dbOps, formatSubForMatchups } = require('../../../lib');

/**
 * This function queries the database for a list of faceoffs for a given squad.
 * @param {Object} conn knex client connection
 * @param {number} SquadID unique integer squad id
 * @returns {Promise} returns a promise that resolves to a list of Faceoff objects
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
  // Iterate over the faceoffs passed in on the key f = FaceoffID
  for (let f in faceoffs) {
    // pulls submissions from the database based on the faceoffs SubmissionIDs
    const s1 = await dbOps.getSubByID(conn, faceoffs[f].SubmissionID1);
    const s2 = await dbOps.getSubByID(conn, faceoffs[f].SubmissionID2);
    // Add formatted submissions to the faceoffs object reference passed into the function
    faceoffs[f].Submission1 = formatSubForMatchups(s1);
    faceoffs[f].Submission2 = formatSubForMatchups(s2);
  }
};

module.exports = {
  getSubIdsForFaceoffs,
  addSubmissionsToFaceoffs,
};
