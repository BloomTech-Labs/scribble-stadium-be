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
const markAsRead = (ID) => {
  return db('Submissions').where({ ID }).update({ HasRead: true });
};

module.exports = {
  getOrInitSubmission,
  markAsRead,
};
