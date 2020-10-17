const { dbOps, formatSubForMatchups } = require('../../../lib');

const getSubIdsForFaceoffs = (conn, SquadID) => {
  return conn('Faceoffs AS F')
    .join('Squads AS S', 'S.ID', 'F.SquadID')
    .where('S.ID', SquadID)
    .select('F.*');
};

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
