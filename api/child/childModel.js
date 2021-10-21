const db = require('../../data/db-config');

/**
 * A method to get all children from the database
 * @returns {Promise} promise that resolves to array of all children
 */
const getAll = () => {
  return db('Children AS C')
    .join('Avatars AS A', 'C.AvatarID', 'A.ID')
    .join('GradeLevels AS G', 'C.GradeLevelID', 'G.ID')
    .select([
      'C.ID',
      'C.Name',
      'C.PIN',
      'C.IsDyslexic',
      'C.ParentID',
      'C.CohortID',
      'C.AvatarID',
      'C.Total_Points',
      'C.Wins',
      'C.Losses',
      'C.Ballots',
      'C.VotesRemaining',
      'C.Achievements',
      'G.GradeLevel',
      'A.AvatarURL',
    ]);
};

/**
 * Search the database for child with the given ID
 * @param {number} ID the unique ID to search the database on
 * @returns {Promise} promise that resolves to array of users with matching ID, empty if none found
 */
const getById = async (ID) => {
  const childData = await db('Children AS C')
    .where('C.ID', ID)
    .join('Avatars AS A', 'C.AvatarID', 'A.ID')
    .join('GradeLevels AS G', 'C.GradeLevelID', 'G.ID')
    .select([
      'C.ID',
      'C.Name',
      'C.PIN',
      'C.IsDyslexic',
      'C.ParentID',
      'C.CohortID',
      'C.AvatarID',
      'C.Total_Points',
      'C.Wins',
      'C.Losses',
      'C.Ballots',
      'C.VotesRemaining',
      'C.Achievements',
      'G.GradeLevel',
      'A.AvatarURL',
      'C.Streaks',
    ]);
  const notificationData = await db('Children-Notifications AS B')
    .where('B.ChildID', ID)
    .join('Notifications AS N', 'N.ID', 'B.NotificationID')
    .select('Text', 'Read', 'LinksTo', 'Date');
  childData[0].notifications = notificationData;
  const eventData = await db('Children-Events AS B')
    .where('B.ChildID', ID)
    .join('Events as E', 'E.ID', 'B.EventID')
    .select('E.Name', 'B.Enabled', 'B.Completed');
  childData[0].events = eventData;
  return childData;
};

/**
 * Adds a child to the database
 * @param {Object} child contains the child's info
 * @param {string} child.Name child's name stored in a string
 * @param {string} child.PIN string of child's 4-digit PIN
 * @param {number} child.ParentID foreign key pointing to an existing parent's ID
 * @param {number} child.AvatarID foreign key pointing to an existing ID in Avatars table
 * @returns {Promise} promise that resolves to ID of new child or an error message
 */
const add = (child) => {
  return db('Children').insert(child).returning('ID');
};

/**
 * Attempts to update the row in Children table that matched the ID witht eh given changes
 * @param {number} ID
 * @param {Object} changes contains the child's info to be changed
 * @param {string} [child.Name] new child's name stored in a string
 * @param {string} [child.PIN] new string of child's 4-digit PIN
 * @param {number} [child.AvatarID] foreign key pointing to a different ID in Avatars table
 * @returns {Promise} promise that resolves to a count of # of rows updated
 */
const update = (ID, changes) => {
  return db('Children').where({ ID }).update(changes);
};

/**
 * Attempts to delete row in Children table with matching ID
 * @param {number} ID ID of the child to delete
 * @returns {Promise} promise that resolves to a count of # of rows deleted
 */
const remove = (ID) => {
  return db('Children').where({ ID }).del();
};

/**
 * Attempts to get the complexities of all of a child's submissions
 * @param {number} ChildID the ID of the child whose data you want to view
 * @returns {Promise} returns a promise that resolves to an array of child submission complexities
 */
const getComplexityList = (ChildID) => {
  return db('Submissions')
    .where({ ChildID })
    .orderBy('ID', 'desc')
    .select(['ID', 'Complexity']);
};

//Will return a single submission
const getSubmissionBySubId = async (id) => {
  const submission = await db('Submissions-New').where({
    id,
  });
  const pages = await getPagesBySubmissionId(id);
  const pagesArray = [];
  for (let i = 0; i < pages.length; i++) {
    pagesArray.push(pages[i]);
  }
  const submissionWithPages = {
    ...submission,
    pages: pagesArray[0],
  };
  return [submissionWithPages];
};

/**
 * This will query the database for a list of all of a child's submissions.
 * @param {number} childId integer key of the requested child
 * @returns {Array} a list of submission objects
 */
const getAllSubmissions = (childId) => {
  return db.transaction(async (trx) => {
    const subs = await trx('Submissions-New').where({ childId });
    const res = subs.map((sub) => ({
      ...sub,
    }));
    return res;
  });
};

const getPagesBySubmissionId = (submissionId) => {
  return db.transaction(async (trx) => {
    const pages = await trx('Pages').where({ submissionId });
    const res = pages.map((page) => ({
      ...pages,
    }));
    return res;
  });
};

const addSubmission = (submission) => {
  return db('Submissions-New').insert(submission);
};

const addPage = (page) => {
  return db('Pages').insert(page);
};

const updateSubmissionBySubId = async (id, changes) => {
  const updatedSub = await db('Submissions-New').where({ id }).update(changes);
  return updatedSub;
};

const updatePage = async (id, changes) => {
  const updatedPage = await db('Pages').where({ id }).update(changes);
  return updatedPage;
};

const removeSubmission = (id) => {
  return db('Submissions-New').where({ id }).del();
};

const removePage = (id) => {
  return db('Pages').where({ id }).del();
};
module.exports = {
  getAll,
  getById,
  add,
  update,
  remove,
  getComplexityList,
  getSubmissionBySubId,
  getAllSubmissions,
  addSubmission,
  updateSubmissionBySubId,
  removeSubmission,
  getPagesBySubmissionId,
  addPage,
  updatePage,
  removePage,
};
