const db = require('../../data/db-config');
const { formatTeam } = require('../../lib');
const { points, faceoff } = require('./gameHelpers');

/**
 * Attempts to query the database for all submissions from a given child's team
 * @param {number} ChildID integer ID of a child
 * @returns {Promise} a promise that resolves to a formatted team object (documented on GET /game/team endpoint)
 */
const getFormattedTeam = (ChildID) => {
  return db.transaction(async (trx) => {
    const team = await points.getTeamIDByChild(trx, ChildID);
    const submissions = await points.getTeamByID(trx, team.TeamID);
    return formatTeam(submissions);
  });
};

const assignPoints = (points) => {
  return db('Points').insert(points).returning('ID');
};

const getFaceoffsForSquad = (SquadID) => {
  return db.transaction(async (trx) => {
    try {
      const faceoffs = await faceoff.getSubIdsForFaceoffs(trx, SquadID);
      await faceoff.addSubmissionsToFaceoffs(trx, faceoffs);

      return faceoffs;
    } catch (err) {
      trx.rollback();
    }
  });
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

const getSquadResults = (ID) => {
  return db('Squads AS S')
    .join('Teams AS T', 'S.ID', 'T.SquadID')
    .where('S.ID', ID)
    .orderBy('T.Num', 'asc');
};

module.exports = {
  getFormattedTeam,
  assignPoints,
  getFaceoffsForSquad,
  getSquadIDFromChildID,
  getVotesBySquad,
  submitVote,
  getSquadResults,
};
