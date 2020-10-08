const db = require('../../data/db-config');

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
  const data = await db('Submissions AS S')
    .where({ CohortID })
    .join('Writing AS W', 'S.ID', 'W.SubmissionID')
    .join('Drawing AS D', 'S.ID', 'D.SubmissionID')
    .leftJoin('Flags AS F', 'S.ID', 'F.SubmissionID')
    .select([
      'S.ID',
      'S.Status',
      'W.URL AS WritingURL',
      'W.PageNum',
      'D.URL AS DrawingURL',
      'F.Inappropriate',
      'F.Sensitive',
    ])
    .orderBy('S.ID', 'ASC')
    .orderBy('W.PageNum', 'ASC');

  const res = {};
  data.forEach((page) => {
    if (!res[page.ID]) {
      res[page.ID] = {
        image: page.DrawingURL,
        inappropriate: page.Inappropriate,
        sensitive: page.Sensitive,
        status: page.Status,
        pages: {},
      };
    }
    res[page.ID].pages[page.PageNum] = page.WritingURL;
  });
  return res;
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

module.exports = {
  getCohorts,
  addCohort,
  getSubmissionsByCohort,
  moderatePost,
};
