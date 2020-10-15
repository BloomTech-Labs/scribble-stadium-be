const db = require('../../data/db-config');
const { formatCohortSubmissions, dbOps } = require('../../lib');
const _maxBy = require('lodash.maxby');

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

const getSubmissionsWithPointSums = (conn) => {
  return conn('Points AS P')
    .join('Submissions AS S', 'S.ID', 'P.SubmissionID')
    .join('Children AS C', 'C.ID', 'S.ChildID')
    .join('Members AS M', 'S.ID', 'M.SubmissionID')
    .join('Teams AS T', 'T.ID', 'M.TeamID')
    .select([
      'P.WritingPoints',
      'P.DrawingPoints',
      'C.ID AS ChildID',
      'P.ID AS Vote',
      'M.ID AS MemberID',
      'M.TeamID',
      'T.SquadID',
      'S.ID',
    ]);
};

const formatPointSums = (submissions) => {
  const res = {};
  submissions.forEach((page) => {
    const votes = new Set();
    if (!res[page.ID]) {
      res[page.ID] = {
        MemberID: page.MemberID,
        SquadID: page.SquadID,
        TeamID: page.TeamID,
        SubmissionID: page.ID,
        ChildID: page.ChildID,
        WritingPoints: 0,
        DrawingPoints: 0,
      };
    }
    if (!votes.has(page.Vote)) {
      votes.add(page.Vote);
      res[page.ID].WritingPoints += page.WritingPoints;
      res[page.ID].DrawingPoints += page.DrawingPoints;
    }
  });
  return res;
};

const sortBySquad = (submissions) => {
  const teams = {};
  submissions.forEach((sub) => {
    if (!teams[sub.SquadID]) teams[sub.SquadID] = {};
    if (!teams[sub.SquadID][sub.TeamID]) teams[sub.SquadID][sub.TeamID] = [];
    teams[sub.SquadID][sub.TeamID].push(sub);
  });
  return teams;
};

const rankSubs = (teamRef, type) => {
  const maxSubIndex = teamRef.indexOf(_maxBy(teamRef, `${type}Points`));
  const minSubIndex = maxSubIndex ? 0 : 1;
  return [maxSubIndex, minSubIndex];
};

const formatMatchup = (subs, Type) => ({
  Points:
    subs[0][Type === 'WRITING' ? 'WritingPoints' : 'DrawingPoints'] +
    subs[1][Type === 'WRITING' ? 'WritingPoints' : 'DrawingPoints'],
  Type,
  SubmissionID1: subs[0].SubmissionID,
  SubmissionID2: subs[1].SubmissionID,
});

const groupOnPoints = (squads) => {
  const matchups = [];
  for (let SquadID in squads) {
    let maxWritingSubs = [];
    let minWritingSubs = [];
    let maxDrawingSubs = [];
    let minDrawingSubs = [];
    for (let TeamID in squads[SquadID]) {
      // Generate writing matchups
      const [wMaxI, wMinI] = rankSubs(squads[SquadID][TeamID], 'Writing');
      maxWritingSubs.push(squads[SquadID][TeamID][wMaxI]);
      minWritingSubs.push(squads[SquadID][TeamID][wMinI]);

      // generate drawing matchups
      const [dMaxI, dMinI] = rankSubs(squads[SquadID][TeamID], 'Drawing');
      maxDrawingSubs.push(squads[SquadID][TeamID][dMaxI]);
      minDrawingSubs.push(squads[SquadID][TeamID][dMinI]);
    }
    matchups.push(
      formatMatchup(maxWritingSubs, 'WRITING'),
      formatMatchup(minWritingSubs, 'WRITING'),
      formatMatchup(maxDrawingSubs, 'DRAWING'),
      formatMatchup(minDrawingSubs, 'DRAWING')
    );
  }
  return matchups;
};

const generateFaceoffs = () => {
  return db.transaction(async (trx) => {
    try {
      const data = await getSubmissionsWithPointSums(trx);
      const formattedData = formatPointSums(data);
      const squads = sortBySquad(Object.values(formattedData));
      const matchups = groupOnPoints(squads);

      const IDs = await trx('Faceoffs').insert(matchups).returning('ID');

      return IDs;
    } catch (err) {
      console.log({ err: err.message });
      trx.rollback();
    }
  });
};

module.exports = {
  getCohorts,
  addCohort,
  getSubmissionsByCohort,
  moderatePost,
  generateFaceoffs,
};
