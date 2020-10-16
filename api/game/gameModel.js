const db = require('../../data/db-config');
const { formatTeam, dbOps, formatSubForMatchups } = require('../../lib');

/**
 * Attempts to query the database for all submissions from a given child's team
 * @param {number} ChildID integer ID of a child
 * @returns {Promise} a promise that resolves to a formatted team object (documented on GET /game/team endpoint)
 */
const getFormattedTeam = (ChildID) => {
  return db.transaction(async (trx) => {
    const team = await getTeamIDByChild(trx, ChildID);
    const submissions = await getTeamByID(trx, team.TeamID);
    // const hasSubmittedPoints
    return formatTeam(submissions);
  });
};

const assignPoints = (points) => {
  return db('Points').insert(points).returning('ID');
};

/**
 * Attempts to find the ID of the given child's current team
 * @param {Object} conn a knex client connection
 * @param {number} ChildID integer ID of a child
 * @returns {Promise} returns a promise that resolves to the team ID of the given child
 */
const getTeamIDByChild = (conn, ChildID) => {
  return conn('Submissions AS S')
    .where({ ChildID })
    .join('Members AS M', 'S.ID', 'M.SubmissionID')
    .join('Teams AS T', 'M.TeamID', 'T.ID')
    .first()
    .select('TeamID');
};

/**
 * Attempts to query the database for all of a team's submissions and relevant info
 * @param {Object} conn a knex connection
 * @param {number} TeamID the ID of the desired team
 */
const getTeamByID = (conn, TeamID) => {
  return conn('Submissions AS S')
    .join('Members AS M', 'S.ID', 'M.SubmissionID')
    .join('Teams AS T', 'M.TeamID', 'T.ID')
    .where({ TeamID })
    .join('Writing AS W', 'S.ID', 'W.SubmissionID')
    .join('Drawing AS D', 'S.ID', 'D.SubmissionID')
    .select([
      'M.ID AS MemberID',
      'W.PageNum',
      'W.URL AS PageURL',
      'D.URL AS ImgURL',
      'T.Name',
      'S.ID AS SubmissionID',
      'S.ChildID',
    ]);
};

const getFaceoffsForSquad = (SquadID) => {
  return db.transaction(async (trx) => {
    try {
      const faceoffs = await getSubIdsForFaceoffs(trx, SquadID);
      await addSubmissionsToFaceoffs(trx, faceoffs);

      return faceoffs;
    } catch (err) {
      trx.rollback();
    }
  });
};

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

const getSquadIDFromChildID = (ChildID) => {
  return db('Squads AS S')
    .join('Teams AS T', 'S.ID', 'T.SquadID')
    .join('Members AS M', 'T.ID', 'M.TeamID')
    .join('Submissions AS Sub', 'Sub.ID', 'M.SubmissionID')
    .join('Children AS C', 'C.ID', 'Sub.ChildID')
    .where('C.ID', ChildID)
    .select('S.ID');
};

const getVotesBySquad = (SquadID, MemberID) => {
  return db('Votes AS V')
    .join('Members AS M', 'M.ID', 'V.MemberID')
    .join('Teams AS T', 'T.ID', 'M.TeamID')
    .join('Squads AS S', 'S.ID', 'T.SquadID')
    .where({ SquadID, MemberID })
    .select(['FaceoffID', 'Vote']);
};

const submitVote = (vote) => {
  return db('Votes').insert(vote).returning('ID');
};

module.exports = {
  getFormattedTeam,
  assignPoints,
  getFaceoffsForSquad,
  getSquadIDFromChildID,
  getVotesBySquad,
  submitVote,
};
