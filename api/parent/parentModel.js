const db = require('../../data/db-config');
const { formatProfiles } = require('../../lib');

/**
 * A method to get all parents from the database
 * @returns {Promise} promise that resolves to array of all parents in the database
 */
const getAll = () => {
  return db('Parents');
};

/**
 * Search the database for a parent with the given ID
 * @param {number} ID the unique ID to search for
 * @returns {Promise} promise that resolves to an array of users with matching ID, empty if none found
 */
const getById = (ID) => {
  return db('Parents').where({ ID });
};

/**
 * Search the database for a parent with the given ID
 * @param {number} ID the unique ID to search for
 * @returns {Promise} promise that resolves to an array of users with matching ID, empty if none found
 */
const getByEmail = (Email) => {
  return db('Parents').where({ Email });
};

/**
 * Adds a parent to the database
 * @param {Object} parent contains the parent's info
 * @param {string} parent.Name parent's name stored in a string
 * @param {string} parent.Email parent's email in a string
 * @param {string} parent.PIN hashed string of parent's 4-digit PIN
 * @returns {Promise} promise that resolves to results of db query
 */
const add = (parent) => {
  return db('Parents').insert(parent).returning('ID');
};

/**
 * Update the database field that matches ID with the given changes
 * @param {number} ID the unique ID of the parent to update
 * @param {Object} changes the given changes to apply to the parent in the table
 * @param {string} [parent.Name] parent's name stored in a string
 * @param {string} [parent.Email] parent's email in a string
 * @param {string} [parent.PIN] hashed string of parent's 4-digit PIN
 * @returns {Promise} promise that resolves to a count of total rows updated
 */
const update = (ID, changes) => {
  return db('Parents').where({ ID }).update(changes);
};

/**
 * Deletes the database field that matches the ID
 * @param {number} ID the unique ID of the parent to delete
 * @returns {Promise} promise that resolves to a count of total rows deleted
 */
const remove = (ID) => {
  return db('Parents').where({ ID }).del();
};

/**
 * Returns a list of all children profiles for an account
 * @param {number} ID unique ID of the parent
 * @returns {Promise} promise that resolves to an array of children
 */
const getProfilesByEmail = async (Email) => {
  const data = await db('Parents AS P')
    .leftJoin('Children AS C', 'P.ID', 'C.ParentID')
    .leftJoin('Avatars AS A', 'C.AvatarID', 'A.ID')
    .leftJoin('GradeLevels AS G', 'C.GradeLevelID', 'G.ID')
    .where('P.Email', Email)
    .select([
      'P.*',
      'C.ID AS ChildID',
      'C.PIN AS ChildPIN',
      'C.Name AS ChildName',
      'C.IsDyslexic',
      'G.GradeLevel',
      'A.AvatarURL',
    ]);
  return formatProfiles(data);
};

/**
 * This is a specialized query used only in the authMiddleware. It attempts to find a user in the database,
 * and will return the user if found. Otherwise, it will attempt to create that user in the database first,
 * and then will return it.
 * @param {Object} parent contains the parent's info
 * @param {string} parent.Name parent's name stored in a string
 * @param {string} parent.Email parent's email in a string
 * @param {string} parent.PIN hashed string of parent's 4-digit PIN
 * @returns {Object} returns a parent object
 */
/* istanbul ignore next */
const findOrCreate = async (parent) => {
  const foundParent = await getByEmail(parent.Email).then((res) => res);
  if (foundParent.length > 0) {
    return foundParent[0];
  } else {
    const newParent = await db('Parents').insert(parent).returning('*');
    return newParent ? newParent[0] : newParent;
  }
};

module.exports = {
  getAll,
  getById,
  getByEmail,
  add,
  update,
  remove,
  getProfilesByEmail,
  findOrCreate,
};
