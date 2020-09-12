const db = require('../../data/db-config');

/**
 * Queries database for a list of all stories
 * @returns {Promise} a promise that resolves into an array of stories
 */
const getAll = () => {
  return db('Stories');
};

/**
 * Queries the database for a specific story with given ID
 * @param {number} ID the ID to search for in the database
 * @returns {Promise} a promise that resolves to a story object
 */
const getById = (ID) => {
  return db('Stories').where({ ID });
};

/**
 * Queries the database to attempt to add a new story
 * @param {Object} story the story to be added to the database
 * @param {string} story.Title the title of the story
 * @param {string} story.URL the title of the story
 * @param {string} story.WritingPrompt the title of the story
 * @param {string} story.ReadingPrompt the title of the story
 * @retuns {Promise} a promise that resolves to the ID of the new story
 */
const add = (story) => {
  return db('Stories').insert(story).returning('ID');
};

/**
 * Queries the database to update row amtching ID with the given changes
 * @param {number} ID the unique row ID to update
 * @param {Object} changes an object containing the changes
 * @param {string} [changes.Title] new story title (optional)
 * @param {string} [changes.URL] new URL of story PDF (optional)
 * @param {string} [changes.WritingPrompt] new writing prompt (optional)
 * @param {string} [changes.WritingPrompt] new reading prompt (optional)
 * @returns {Promise} a promise that resolves to number of rows updated
 */
const update = (ID, changes) => {
  return db('Stories').where({ ID }).update(changes);
};

/**
 * Queries the database to remove a row
 * @param {number} ID the ID of the row to delete
 * @returns {Promise} a promise that resolves to the number of rows deleted
 */
const remove = (ID) => {
  return db('Stories').where({ ID }).del();
};

module.exports = {
  getAll,
  getById,
  add,
  update,
  remove,
};
