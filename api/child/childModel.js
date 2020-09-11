const db = require('../../data/db-config');

/**
 * A method to get all children from the database
 * @returns {Promise} promise that resolves to array of all children
 */
const findAll = () => {
  return db('Children');
};

/**
 * Search the database for child with the given ID
 * @param {number} ID the unique ID to search the database on
 * @returns {Promise} promise that resolves to array of users with matching ID, empty if none found
 */
const findById = (ID) => {
  return db('Children').where({ ID });
};

/**
 * Find all children based off parent's account
 * @param {number} ParentID the ID of the parent whose children you want returned
 * @returns {Promise} promise that resolves to array of relevant children
 */
const findByParentId = (ParentID) => {
  return db('Children').where({ ParentID });
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

module.exports = {
  findAll,
  findById,
  findByParentId,
  add,
  update,
  remove,
};
