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
      'G.GradeLevel',
      'A.AvatarURL',
    ]);
};

/**
 * Search the database for child with the given ID
 * @param {number} ID the unique ID to search the database on
 * @returns {Promise} promise that resolves to array of users with matching ID, empty if none found
 */
const getById = (ID) => {
  return db('Children AS C')
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
      'G.GradeLevel',
      'A.AvatarURL',
    ]);
};

/**
 * Adds a child to the database
 * @param {Object} child contains the child's info
 * @param {string} child.Name child's name stored in a string
 * @param {string} child.PIN hashed string of child's 4-digit PIN
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
 * @param {string} [child.PIN] new hashed string of child's 4-digit PIN
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

module.exports = {
  getAll,
  getById,
  add,
  update,
  remove,
  getComplexityList,
};
