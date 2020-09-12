const db = require('../../data/db-config');

/**
 * Queries database for a list of all stories
 * @returns {Promise} that resolves into an array of stories
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

module.exports = {
  getAll,
  getById,
  add,
};
