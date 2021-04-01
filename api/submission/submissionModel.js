const db = require('../../data/db-config');
const _omit = require('lodash.omit');

const { dsApi } = require('../../lib');

/**
 * This function checks to see if a submission exists at the given child/story intersection,
 * and will create one if it does not.
 * @param {number} ChildID the ID of the child who is submitting
 * @param {number} StoryID the ID of the story the submission is for
 * @returns {Promise} returns a promise that resolves to a submission object
 */
const getOrInitSubmission = async (ChildID, StoryID) => {
  const foundSubmission = await db('Submissions').where({ ChildID, StoryID });
  if (foundSubmission.length > 0) {
    return foundSubmission[0];
  } else {
    const newSubmission = await db('Submissions')
      .insert({ ChildID, StoryID })
      .returning('*');
    return newSubmission[0];
  }
};

/**
 * This will query the database for a list of all of a child's submissions. The query
 * can likely be simplified greatly, and I'll be taking another look at it soon.
 * @param {number} ChildID integer key of the requested child
 * @returns {Array} a list of submission objects
 */
const getAllSubmissionsByChild = (ChildID) => {
  return db.transaction(async (trx) => {
    const subs = await trx('Submissions').where({ ChildID });
    const pages = {};
    const images = {};
    for (let s in subs) {
      const p = await trx('Writing').where({ SubmissionID: subs[s].ID });
      const i = await trx('Drawing')
        .where({ SubmissionID: subs[s].ID })
        .first();
      pages[s] = p;
      images[s] = i;
    }
    const res = subs.map((x, i) => ({
      ...x,
      pages: pages[i],
      image: images[i] || null,
    }));
    return res;
  });
};

/**
 * This function marks the submission with the given ID as read.
 * @param {number} ID the ID of the submission to be marked as read
 * @returns {Promise} returns a promise that resolves to the count of fields updated
 */
const markAsRead = (ID, flag = true) => {
  return db('Submissions').where({ ID }).update({ HasRead: flag });
};

/**
 * This query is transactional, and runs a series of requests:
 *  - Updates the HasDrawn field for the relevant submission to be true
 *  - Adds the drawing to the Drawing table
 *  - Submits the drawing to the data science API for screening
 * If any of these requests fail, the transaction will be rolled back and the
 * client will be issued an error.
 * @param {Object} drawing an object that contains a link to a submitted drawing
 * @param {number} ID the id of the submission the drawing is for
 * @returns {Promise} returns a promise that doesn't resolve to a value
 */
const submitDrawingTransaction = (drawing, ID) => {
  return db.transaction(async (trx) => {
    try {
      await trx('Submissions').where({ ID }).update({ HasDrawn: true });
      await trx('Drawing').insert(_omit(drawing[0], 'checksum'));
      const drawingProperFormat = {
        ...drawing[0],
        Checksum: drawing[0].checksum,
      };
      // console.log({ dsDrawingRequestBody: drawingProperFormat });
      await dsApi.submitDrawingToDS(drawingProperFormat);
    } catch (err) {
      throw new Error(err.message);
    }
  });
};

/**
 * This query is transactional, and runs a series of requests:
 *  - Updates the HasWritten field for the relevant submission to be true
 *  - Adds the submitted pages to the Writing table
 *  - Submits the pages to the data science API for screening and metrics
 * If any of these requests fail, the transaction will be rolled back and the
 * client will be issued an error.
 * @param {Object} pages an array of formatted page objects
 * @param {number} ID the id of the submission the drawing is for
 * @param {number} storyId the ID of the story the submission is for, used for DS clustering
 * @returns {Promise} returns a promise that doesn't resolve to a value
 */
const submitWritingTransaction = (pages, ID, storyId) => {
  return db.transaction(async (trx) => {
    try {
      await trx('Writing').insert(pages.map((x) => _omit(x, 'checksum')));

      let dsResponse;

      const { data } = await dsApi.submitWritingToDS(storyId, ID, pages);
      dsResponse = data;

      await trx('Submissions')
        .where({ ID })
        .update({
          HasWritten: true,
          LowConfidence: dsResponse.LowConfidence,
          Complexity: Math.round(dsResponse.Complexity),
        });
    } catch (err) {
      throw new Error(err.message);
    }
    return;
  });
};

/**
 * A transactional query that attempts to update the value of the HasWritten field to false,
 * as well as delete the pages for the submission. Both requests must be successful or the
 * transaction will be rolled back.
 * @param {number} ID the id of the submission whose written pages you want to delete
 * @returns {Promise} returns a promise that resolves to the number of rows deleted
 */
const deleteWritingSubmission = (ID) => {
  return db.transaction(async (trx) => {
    await trx('Submissions').where({ ID }).update({ HasWritten: false });
    const count = await trx('Writing').where({ SubmissionID: ID }).del();
    return count;
  });
};

/**
 * A transactional query that attempts to update the value of the HasDrawn field to false,
 * as well as delete the drawing for the submission. Both requests must be successful or
 * the transaction will be rolled back.
 * @param {number} ID the id of the submission whose drawing you want to delete
 * @returns {Promise} returns a promise that resolves to the number of rows deleted
 */
const deleteDrawingSubmission = (ID) => {
  return db.transaction(async (trx) => {
    await trx('Submissions').where({ ID }).update({ HasDrawn: false });
    const count = await trx('Drawing').where({ SubmissionID: ID }).del();
    return count;
  });
};

module.exports = {
  getOrInitSubmission,
  getAllSubmissionsByChild,
  markAsRead,
  submitDrawingTransaction,
  submitWritingTransaction,
  deleteWritingSubmission,
  deleteDrawingSubmission,
};
