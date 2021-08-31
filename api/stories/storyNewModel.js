const db = require('../../data/db-config');

/**
 * Queries the database for a specific story with given ID
 * @param {number} ID the ID to search for in the database
 * @returns {Promise} a promise that resolves to story object of the given story ID
 */
const getById = (ID) => {
  return db('Stories-New').where({ ID });
};

module.exports = {
  getById,
};
