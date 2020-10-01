const db = require('../../data/db-config');
const _omit = require('lodash.omit');

const {
  submitWritingToDS,
  submitDrawingToDS,
} = require('../../lib/dsRequests');

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
 * This function marks the submission with the given ID as read.
 * @param {number} ID the ID of the submission to be marked as read
 * @returns {Promise} returns a promise that resolves to the count of fields updated
 */
const markAsRead = (ID, flag = true) => {
  return db('Submissions').where({ ID }).update({ HasRead: flag });
};

const submitDrawingTransaction = (ID, drawing) => {
  return db.transaction(async (trx) => {
    await trx('Submissions').where({ ID }).update({ HasDrawn: true });
    const res = await trx('Drawing').insert(_omit(drawing, 'checksum'));
    if (res.length < 1) {
      throw new Error('No file uploaded.');
    }
    try {
      await submitDrawingToDS(ID, drawing);
    } catch (err) {
      trx.rollback();
    }
    return;
  });
};

const submitWritingTransaction = (storyId, ID, pages) => {
  return db.transaction(async (trx) => {
    await trx('Submissions').where({ ID }).update({ HasWritten: true });
    const res = await trx('Writing').insert(
      pages.map((x) => _omit(x, 'checksum'))
    );
    if (res.length < 1) {
      throw new Error('No file uploaded.');
    }
    try {
      await submitWritingToDS(storyId, ID, pages);
    } catch (err) {
      trx.rollback();
    }
    return;
  });
};

module.exports = {
  getOrInitSubmission,
  markAsRead,
  submitDrawingTransaction,
  submitWritingTransaction,
};
