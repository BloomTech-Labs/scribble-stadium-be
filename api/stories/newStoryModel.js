const db = require('../../data/db-config');

/**
 * Queries the database for a specific story with given ID
 * @param {number} ID the ID to search for in the database
 * @returns {Promise} a promise that resolves to a story object
 */
const getStoryByID = (ID) => {
  return db('Stories-New AS S').where({ ID }).select('*');
};

module.exports = {
  getStoryByID,
};