const db = require('../../data/db-config');

/**
 * Queries the database to attempt to add a new story
 * @param {Object} story the story to be added to the database
 * @param {string} story.Title the title of the story
 * @param {string} story.Description the description of the story
 * @param {string} story.Author the author of the story
 * @returns {Promise} a promise that resolves to the ID of the new story
 */
const add = (story) => {
  return db('Stories-New').insert(story).returning('ID');
};

/**
 * Queries the database for a specific story with given ID
 * @param {number} ID the ID to search for in the database
 * @returns {Promise} a promise that resolves to story object of the given story ID
 */
const getById = (ID) => {
  return db('Stories-New').where({ ID });
};

const update = (ID, changes) => {
  return db('Stories-New').where({ ID }).update(changes);
};

const remove = (ID) => {
  return db('Stories-New').where({ ID }).del();
};

module.exports = {
  add,
  getById,
  update,
  remove,
};
