const db = require('../../data/db-config');

const getOrInitSubmission = async (ChildID, StoryID) => {
  const foundSubmission = await db('Submissions').where({ ChildID, StoryID });
  if (foundSubmission.length > 0) {
    return foundSubmission[0];
  } else {
    const newSubmission = await db('Submissions')
      .insert({ ChildID, StoryID })
      .returning('*');
    return newSubmission;
  }
};

const markAsRead = (ID) => {
  return db('Submissions').where({ ID }).update({ HasRead: true });
};

module.exports = {
  getOrInitSubmission,
  markAsRead,
};
