const db = require('../../data/db-config');

/**
 * This function checks to see if a submission exists at the given child/story intersection,
 * and will create one if it does not.
 * @param {number} childId the ID of the child who is submitting
 * @param {number} storyId the ID of the story the submission is for
 * @returns {Promise} returns a promise that resolves to a submission object
 */
const getOrInitSubmission = async (childId, storyId, episodeId) => {
  const foundSubmission = await db('Submissions-New').where({
    childId,
    storyId,
    episodeId,
  });
  if (foundSubmission.length > 0) {
    return foundSubmission[0];
  } else {
    const newSubmission = await db('Submissions-New')
      .insert({ childId, storyId, episodeId })
      .returning('*');
    return newSubmission[0];
  }
};

/**
 * This will query the database for a list of all of a child's submissions.
 * @param {number} childId integer key of the requested child
 * @returns {Array} a list of submission objects
 */
const getAllSubmissionsByChild = (childId) => {
  return db.transaction(async (trx) => {
    const subs = await trx('Submissions-New').where({ childId });
    const res = subs.map((sub) => ({
      ...sub,
    }));
    return res;
  });
};

const updateSubmissionsBySubId = async (id, changes) => {
  const updatedSub = await db('Submissions-New').where({ id }).update(changes);
  return updatedSub;
};

const removeSubmission = (ID) => {
  return db('Submissions-New').where({ ID }).del();
};
module.exports = {
  getOrInitSubmission,
  getAllSubmissionsByChild,
  updateSubmissionsBySubId,
  removeSubmission,
};
