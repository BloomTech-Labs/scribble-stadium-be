const db = require('../../data/db-config');

/**
 * A method to get all parents from the database
 * @returns {Promise} promise that resolves to array of all parents in the database
 */
const findAll = () => {
  return db('Parents');
};

/**
 * Search the database for a parent with the given ID
 * @param {number} ID the unique ID to search for
 * @returns {Promise} promise that resolves to an array of users with matching ID, empty if none found
 */
const findById = (ID) => {
  return db('Parents').where({ ID });
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

const getProfiles = (ID) => {
  return db('Parents AS P')
    .join('Children AS C', 'C.ParentID', 'P.ID')
    .where('C.ParentID', ID)
    .select(['C.PIN AS PIN', 'C.Name AS Name'])
    .orderBy('C.ID');
};

module.exports = {
  findAll,
  findById,
  add,
  update,
  remove,
  getProfiles,
};
