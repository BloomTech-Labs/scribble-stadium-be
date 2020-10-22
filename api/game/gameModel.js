const db = require('../../data/db-config');
const { formatTeam } = require('../../lib');
const { points, faceoff } = require('./gameHelpers');

/**
 * Takes a child ID and returns the child's current squad
 * @param {number} ChildID unique integer id of a child
 * @returns {Promise} returns a promise that resovles to an ID
 */
const getSquadIDFromChildID = (ChildID) => {
  return db('Squads AS S')
    .join('Teams AS T', 'S.ID', 'T.SquadID')
    .join('Members AS M', 'T.ID', 'M.TeamID')
    .join('Submissions AS Sub', 'Sub.ID', 'M.SubmissionID')
    .join('Children AS C', 'C.ID', 'Sub.ChildID')
    .where('C.ID', ChildID)
    .select('S.ID');
};

/**
 * Attempts to query the database for all submissions from a given child's team
 * @param {number} ChildID integer ID of a child
 * @returns {Promise} a promise that resolves to a formatted team object (documented on GET /game/team endpoint)
 */
const getFormattedTeam = (ChildID) => {
  return db.transaction(async (trx) => {
    try {
      const team = await points.getTeamIDByChild(trx, ChildID);
      const submissions = await points.getTeamByID(trx, team.TeamID);
      console.log({ submissions });
      return formatTeam(submissions);
    } catch (err) {
      console.log({ err: err.message });
      throw new Error(err.message);
    }
  });
};

/**
 * This query allows children to assign points to submissions in their team
 * @param {Object} points an object representing the amount of points
 * @param {number} points.MemberID the unique ID of the member who is voting
 * @param {number} points.SubmissionID the unique ID of the submission being voted on
 * @param {number} points.WritingPoints the # of points for the written submission
 * @param {number} points.DrawingPoints the # of points for the drawn submission
 * @returns {Promise} returns a promise resolving to the new ID
 */
const assignPoints = (points) => {
  return db('Points').insert(points).returning('ID');
};

/**
 * This query returns the matchups for a given squad.
 * @param {number} SquadID unique integer ID of the squad to retrieve data for
 * @returns {Array} returns an array of 4 faceoffs that will be documented in swagger
 */
const getFaceoffsForSquad = (SquadID) => {
  return db.transaction(async (trx) => {
    try {
      // Get the faceoffs from the Faceoffs table in the db
      const faceoffs = await faceoff.getSubIdsForFaceoffs(trx, SquadID);
      if (faceoffs.length <= 0) throw new Error('NotFound');
      // Add submission data to the faceoffs pulled from the DB
      await faceoff.addSubmissionsToFaceoffs(trx, faceoffs);

      return faceoffs;
    } catch (err) {
      throw new Error(err.message);
    }
  });
};

/**
 * This function queries the database for an array of votes cast by a user
 * in a specific squad. This is to provide data on what has already been
 * voted on in order to restrict user from voting again on the frontend.
 * It first runs a check to make sure that the given IDs exist in the database,
 * and will throw an error that triggers a 404 if they don't.
 * @param {number} SquadID the unique integer ID of a squad
 * @param {number} MemberID the unique integer ID of the member
 * @returns {Promise} returns a promise that resolves to an array of votes\
 *                    ex. [ { FaceoffID: int, Vote: 1 | 2 }, ... ]
 */
const getVotesBySquad = (SquadID, MemberID) => {
  return db.transaction(async (trx) => {
    try {
      const squads = await trx('Squads').where({ ID: SquadID });
      const members = await trx('Members').where({ ID: MemberID });

      if (squads.length <= 0 || members.length <= 0)
        throw new Error('NotFound');

      return trx('Votes AS V')
        .join('Members AS M', 'M.ID', 'V.MemberID')
        .join('Teams AS T', 'T.ID', 'M.TeamID')
        .join('Squads AS S', 'S.ID', 'T.SquadID')
        .where({ SquadID, MemberID })
        .select(['FaceoffID', 'Vote']);
    } catch (err) {
      throw new Error(err.message);
    }
  });
};

/**
 * Allows a child's vote to be recorded in the database
 * @param {Object} vote a child's vote on a submission
 * @param {number} vote.Vote a value either (1 | 2) to say if they voted for submission 1 or 2
 * @param {number} vote.FaceoffID the unique integer ID of the faceoff being voted on
 * @param {number} vote.MemberID the unique integer ID of the member voting
 * @returns {Promise} returns a promise that resolves to the newly created Vote ID
 */
const submitVote = (vote) => {
  return db('Votes').insert(vote).returning('ID');
};

/**
 * Returns the winner/points total of teams for a given squad
 * @param {number} ID the unique integer ID of a squad
 * @returns {Promise} returns a promise that resolves to an array of 2 teams with squad info
 */
const getSquadResults = (ID) => {
  return db.transaction(async (trx) => {
    try {
      const squads = await trx('Squads').where({ ID });
      if (squads.length <= 0) throw new Error('NotFound');

      return trx('Squads AS S')
        .join('Teams AS T', 'S.ID', 'T.SquadID')
        .where('S.ID', ID)
        .orderBy('T.Num', 'asc');
    } catch (err) {
      throw new Error(err.message);
    }
  });
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
