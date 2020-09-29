const db = require('../../data/db-config');

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

/**
 * This function marks the submission with the given ID as written.
 * @param {number} ID the ID of the submission to be marked as written
 * @returns {Promise} returns a promise that resolves to the count of fields updated
 */
const markAsWritten = (ID, flag = true) => {
  return db('Submissions').where({ ID }).update({ HasWritten: flag });
};

/**
 * This function marks the submission with the given ID as drawn.
 * @param {number} ID the ID of the submission to be marked as drawn
 * @returns {Promise} returns a promise that resolves to the count of fields updated
 */
const markAsDrawn = (ID, flag = true) => {
  return db('Submissions').where({ ID }).update({ HasDrawn: flag });
};

/**
 * This function uploads a child's written pages to the database.
 * @param {Array} pages an array of pages formatted by the router
 * @returns {Promise} returns a promise that resolves to an array of the newly uploaded
 * pages with the fields ID, URL, and PageNum
 */
const submitWriting = (pages) => {
  return db('Writing').insert(pages).returning(['ID', 'URL', 'PageNum']);
};

/**
 * This function uploads a child's drawing to the database.
 * @param {Array} drawing an array containing a single drawing formatted by the router
 * @returns {Promise} returns a promise that resolves to an array containing a single
 * drawing object with the fields ID and URL
 */
const submitDrawing = (drawing) => {
  return db('Drawing').insert(drawing).returning(['ID', 'URL']);
};

module.exports = {
  getOrInitSubmission,
  markAsRead,
  markAsWritten,
  markAsDrawn,
  submitWriting,
  submitDrawing,
};
