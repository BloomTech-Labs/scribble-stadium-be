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
    .select(['S.ID', 'M.ID AS MemberID']);
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

// From Team E
/**
 * The goal of this query is to get all the
 * submissions from the entire database, join
 * the squads table and submissions table together
 * only adding submissions from squads that are not
 * in the current squad
 * @param {number} SquadID
 * @returns {Promise} returns a problems that resolves to an ID
 */
const getSquadIDForBots = (SquadID) => {
  return db('Submissions as Sub')
    .join('Squads as S', 'Sub.ID', '=', 'S.ID')
    .whereNot({
      ID: SquadID,
    })
    .select('S.ID');
};

const getAllFaceOffs = () => {
  return db('Faceoffs AS F').select([
    'F.ID',
    'F.Points',
    'F.Type',
    'F.SubmissionID1',
    'F.SubmissionID2',
    'F.SquadID',
    'F.Winner',
    'F.Date',
    'F.VotesCasted',
  ]);
};

const getFaceOffByID = (ID) => {
  return db('Faceoffs AS F')
    .where('F.ID', ID)
    .select([
      'F.ID',
      'F.Points',
      'F.Type',
      'F.SubmissionID1',
      'F.SubmissionID2',
      'F.SquadID',
      'F.Winner',
      'F.Date',
      'F.VotesCasted',
    ]);
};

/**
 * This query returns the matchups for a given squad.
 * @param {number} SquadID unique integer ID of the squad to retrieve data for
 * @param {number} ChildID (optional) unique integer ID of the child to retrieve emoji feedback for
 * @returns {Array} returns an array of 4 faceoffs that will be documented in swagger
 */
const getFaceoffsForSquad = (SquadID, ChildID = null) => {
  // return db.transaction(async (trx) => {
  //   try {
  //     // Get the faceoffs from the Faceoffs table in the db
  //     const faceoffs = await faceoff.getSubIdsForFaceoffs(trx, SquadID);
  //     if (faceoffs.length <= 0) throw new Error('NotFound');
  //     // Add submission data to the faceoffs pulled from the DB
  //     await faceoff.addSubmissionsToFaceoffs(trx, faceoffs);

  //     return faceoffs;
  //   } catch (err) {
  //     throw new Error(err.message);
  //   }
  // });

  // From Team E
  return db.transaction(async (trx) => {
    try {
      // Get the faceoffs from the Faceoffs table in the db

      const faceoffs = await faceoff.getSubIdsForFaceoffs(
        trx,
        SquadID,
        ChildID
      );

      // Check the length of faceoffs if it is less than 0 return an error
      if (faceoffs.length <= 0) {
        throw new Error('NotFound');
        // if the length is less than 4
        // return the difference between the length and 4
        // the number of ghost users to add is the difference
        // between the length and 4
      } else {
        if (faceoffs.length < 4) {
          const faceoffLengthDifference = 4 - faceoffs.length;

          // generate the ghost users and add the number of ghost users
          // equal to the value of faceoffLengthDifference
          for (let i = 0; i <= faceoffLengthDifference; i++) {
            getSquadIDForBots(SquadID);
          }
        }
      }

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
 * @param {number} vote.subEmojis1 emoji review given to a writing or drawing #1
 * @param {number} vote.subEmojis2 emoji review given to a writing or drawing #2
 * @returns {Promise} returns a promise that resolves to the newly created Vote ID
 */
const submitVote = (vote) => {
  // return db('Votes').insert(vote).returning('ID');
  return db.transaction(async (trx) => {
    try {
      const { Vote, MemberID, FaceoffID, subEmojis1, subEmojis2 } = vote;
      const returning = await trx('Votes')
        .insert({ Vote, MemberID, FaceoffID })
        .returning('ID');
      // This is where I need to reference the child voted for and connect the two tables
      // Take faceoffID find the submissionID and then find the ChildId
      const faceoff = await trx('Faceoffs')
        .select('*')
        .where({ ID: FaceoffID })
        .first();
      let faceoffType = faceoff.Type;
      faceoffType = faceoffType === 'WRITING' ? 'Writing' : 'Drawing';
      const emojis1 = Object.values(
        await trx(faceoffType)
          .select('Emoji')
          .where({ SubmissionID: faceoff.SubmissionID1 })
          .first()
      );
      const emojis2 = Object.values(
        await trx(faceoffType)
          .select('Emoji')
          .where({ SubmissionID: faceoff.SubmissionID2 })
          .first()
      );
      // console.log(emojis1);
      // console.log(emojis2);
      const emojiToReturn1 =
        emojis1[0] !== '' ? subEmojis1 + emojis1 : subEmojis1;
      const emojiToReturn2 =
        emojis2[0] !== '' ? subEmojis2 + emojis2 : subEmojis2;
      await trx(faceoffType)
        .update({ Emoji: emojiToReturn1 })
        .where({ SubmissionID: faceoff.SubmissionID1 });
      await trx(faceoffType)
        .update({ Emoji: emojiToReturn2 })
        .where({ SubmissionID: faceoff.SubmissionID2 });
      return returning;
    } catch (error) {
      console.log(error);
    }
  });
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
  getAllFaceOffs,
  getFaceOffByID,
};
