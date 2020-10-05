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

const submitDrawingTransaction = (drawing, ID) => {
  return db.transaction(async (trx) => {
    await trx('Submissions').where({ ID }).update({ HasDrawn: true });
    await trx('Drawing').insert(drawing.map((x) => _omit(x, 'checksum')));
    try {
      await dsApi.submitDrawingToDS(ID, drawing);
    } catch (err) {
      trx.rollback();
    }
    return;
  });
};

const submitWritingTransaction = (pages, ID, storyId) => {
  return db.transaction(async (trx) => {
    await trx('Submissions').where({ ID }).update({ HasWritten: true });
    await trx('Writing').insert(pages.map((x) => _omit(x, 'checksum')));
    try {
      await dsApi.submitWritingToDS(storyId, ID, pages);
    } catch (err) {
      trx.rollback();
    }
    return;
  });
};

const deleteWritingSubmission = (ID) => {
  return db.transaction(async (trx) => {
    await trx('Submissions').where({ ID }).update({ HasWritten: false });
    const count = await trx('Writing').where({ SubmissionID: ID }).del();
    return count;
  });
};

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
